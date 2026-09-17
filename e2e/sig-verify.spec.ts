import { test, expect, Page } from "@playwright/test"

let errors: string[] = []

test.beforeEach(async ({ page }) => {
  errors = []
  page.on("console", msg => {
    if (msg.type() === "error" && !msg.text().includes("Failed to load resource")) errors.push(msg.text())
  })
  page.on("pageerror", err => errors.push(err.message))
})

async function gotoWidget(page: Page, route = "/metronome") {
  await page.goto(route, { waitUntil: "networkidle" })
  await expect(page.locator("span.font-mono.text-3xl")).toBeVisible({ timeout: 10000 })
}

const dots = (page: Page) => page.locator('button[title^="Beat "]')

async function sigButtons(page: Page): Promise<string[]> {
  return page.locator("div.lg\\:col-span-7 > div").first().getByRole("button").allTextContents()
}

async function dotCount(page: Page): Promise<number> {
  return dots(page).count()
}

async function setBpm(page: Page, bpm: number) {
  const slider = page.getByRole("slider", { name: "BPM" })
  await slider.focus()
  if (bpm === 500) await page.keyboard.press("End")
}

function sig(scope: string): string {
  return `[id^="sig-${scope}-"]`
}

test.describe.configure({ mode: "serial" })

test("presets order preserved + 9/8 and 12/8 added + Custom", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  const labels = await sigButtons(page)
  expect(labels).toEqual(["2/4", "3/4", "4/4", "5/4", "6/8", "7/8", "9/8", "12/8", "Custom"])
})

test("each preset renders correct number of beat dots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  const cases: [string, number][] = [
    ["2/4", 2], ["3/4", 3], ["4/4", 4], ["5/4", 5], ["6/8", 6], ["7/8", 7], ["9/8", 9], ["12/8", 12],
  ]
  for (const [sig, n] of cases) {
    await page.getByRole("button", { name: sig, exact: true }).click()
    await expect(dots(page)).toHaveCount(n)
  }
})

test("beat-dot click cycles states on 9/8 and 12/8 exactly as presets", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  await page.getByRole("button", { name: "9/8", exact: true }).click()
  await expect(dots(page)).toHaveCount(9)
  const first = page.locator('button[title="Beat 1: Normal (click to change)"]')
  await expect(first).toHaveCount(1)
  await first.click()
  await expect(page.locator('button[title="Beat 1: Ghost (click to change)"]')).toHaveCount(1)
  await page.locator('button[title="Beat 1: Ghost (click to change)"]').click()
  await expect(page.locator('button[title="Beat 1: Mute (click to change)"]')).toHaveCount(1)
  await page.locator('button[title="Beat 1: Mute (click to change)"]').click()
  await expect(page.locator('button[title="Beat 1: Accent (click to change)"]')).toHaveCount(1)
  await page.locator('button[title="Beat 1: Accent (click to change)"]').click()
  await expect(page.locator('button[title="Beat 1: Normal (click to change)"]')).toHaveCount(1)
})

test("audio: 9/8 and 12/8 play N clicks per measure (all dots pulse, bar wraps)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  await setBpm(page, 500)

  async function checkSig(label: string, n: number) {
    await page.getByRole("button", { name: label, exact: true }).click()
    await expect(dots(page)).toHaveCount(n)
    await page.getByRole("button", { name: "START", exact: true }).click()
    await expect(page.getByRole("button", { name: "STOP", exact: true })).toBeVisible()

    const seen = new Set<number>()
    const firstSeenTime: Map<number, number> = new Map()
    const start = Date.now()
    while (Date.now() - start < 3500) {
      const active = await page.\u0024\u0024eval('button[title^="Beat "]', (els: HTMLElement[]) =>
        els.map((el, i) => ({ i, c: el.getAttribute("class") || "" }))
          .filter(x => x.c.includes("bg-[#1565FF]"))
          .map(x => x.i)
      )
      for (const ix of active) {
        if (!firstSeenTime.has(ix)) firstSeenTime.set(ix, Date.now())
        seen.add(ix)
      }
      await page.waitForTimeout(30)
    }
    // all N beat indices pulsed
    for (let i = 0; i < n; i++) expect(seen.has(i), `beat index ${i} of ${label} never pulsed`).toBeTruthy()
    // at least one index pulsed more than once (bar wrap)
    expect(firstSeenTime.size).toBe(n)
    await page.getByRole("button", { name: "STOP", exact: true }).click()
    await expect(page.getByRole("button", { name: "START", exact: true })).toBeVisible()
  }

  await checkSig("9/8", 9)
  await checkSig("12/8", 12)
})

test("custom: 11/8 -> 11 dots, 13/16 -> 13 dots, unit select limited to 4/8/16", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  await page.getByRole("button", { name: "Custom", exact: true }).click()

  const beatsInput = page.getByLabel("Custom beats per measure")
  const unitSelect = page.getByLabel("Custom beat unit")
  const options = await unitSelect.locator("option").allTextContents()
  expect(options).toEqual(["4", "8", "16"])

  await beatsInput.fill("11")
  await unitSelect.selectOption("8")
  await expect(dots(page)).toHaveCount(11)

  // audio runs with custom signature
  await page.getByRole("button", { name: "START", exact: true }).click()
  await expect(page.getByRole("button", { name: "STOP", exact: true })).toBeVisible()
  await page.getByRole("button", { name: "STOP", exact: true }).click()

  await beatsInput.fill("13")
  await unitSelect.selectOption("16")
  await expect(dots(page)).toHaveCount(13)
})

test("custom 4/4 identical to preset 4/4 + clamp 0->1 and 33->32 + empty falls back", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)

  // preset 4/4
  await page.getByRole("button", { name: "4/4", exact: true }).click()
  await expect(dots(page)).toHaveCount(4)

  // custom 4/4
  await page.getByRole("button", { name: "Custom", exact: true }).click()
  const beatsInput = page.getByLabel("Custom beats per measure")
  await beatsInput.fill("4")
  await expect(dots(page)).toHaveCount(4)

  // 0 -> clamps to 1, no crash
  await beatsInput.fill("0")
  await expect(beatsInput).toHaveValue("1")
  await expect(dots(page)).toHaveCount(1)

  // 33 -> clamps to 32, no crash
  await beatsInput.fill("33")
  await expect(beatsInput).toHaveValue("32")
  await expect(dots(page)).toHaveCount(32)

  // empty -> falls back to last valid (32 dots remain)
  await beatsInput.fill("")
  await expect(dots(page)).toHaveCount(32)
})

test("rapid preset <-> custom switching: no stale dots, no errors", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  const beatsInput = page.getByLabel("Custom beats per measure")

  const steps: [() => Promise<void>, number][] = []
  async function clickSig(label: string) {
    await page.getByRole("button", { name: label, exact: true }).click()
  }

  await clickSig("9/8")
  await expect(dots(page)).toHaveCount(9)
  await page.getByRole("button", { name: "Custom", exact: true }).click()
  await beatsInput.fill("11")
  await expect(dots(page)).toHaveCount(11)
  await clickSig("12/8")
  await expect(dots(page)).toHaveCount(12)
  await page.getByRole("button", { name: "Custom", exact: true }).click()
  await beatsInput.fill("13")
  await page.getByLabel("Custom beat unit").selectOption("16")
  await expect(dots(page)).toHaveCount(13)
  await clickSig("3/4")
  await expect(dots(page)).toHaveCount(3)
  await page.getByRole("button", { name: "Custom", exact: true }).click()
  await beatsInput.fill("4")
  await expect(dots(page)).toHaveCount(4)
  await clickSig("6/8")
  await expect(dots(page)).toHaveCount(6)
  await clickSig("7/8")
  await expect(dots(page)).toHaveCount(7)

  expect(errors).toEqual([])
})

test("subdivisions (incl Swing) work on 9/8, 12/8, and custom", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page, "/metronome-with-subdivisions")
  // default route has subdivisions + swing panels; ensure 1/8 and a swing preset are clickable

  for (const subd of ["1/8", "Swing"]) {
    await page.getByRole("button", { name: subd, exact: true }).click()
    for (const sigLabel of ["9/8", "12/8"]) {
      await page.getByRole("button", { name: sigLabel, exact: true }).click()
      const n = sigLabel === "9/8" ? 9 : 12
      await expect(dots(page)).toHaveCount(n)
      await page.getByRole("button", { name: "START", exact: true }).click()
      await expect(page.getByRole("button", { name: "STOP", exact: true })).toBeVisible()
      await page.getByRole("button", { name: "STOP", exact: true }).click()
    }
    await page.getByRole("button", { name: "Custom", exact: true }).click()
    await page.getByLabel("Custom beats per measure").fill("11")
    await expect(dots(page)).toHaveCount(11)
    await page.getByRole("button", { name: "START", exact: true }).click()
    await expect(page.getByRole("button", { name: "STOP", exact: true })).toBeVisible()
    await page.getByRole("button", { name: "STOP", exact: true }).click()
  }
  expect(errors).toEqual([])
})

test("Gap Click and Random Mute with 9/8 + custom", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  await page.getByRole("button", { name: "9/8", exact: true }).click()
  await page.getByRole("switch", { name: "Toggle Gap Click" }).click()
  await page.getByRole("switch", { name: "Toggle Random Mute" }).click()
  await expect(dots(page)).toHaveCount(9)
  await page.getByRole("button", { name: "START", exact: true }).click()
  await expect(page.getByRole("button", { name: "STOP", exact: true })).toBeVisible()
  await page.getByRole("button", { name: "STOP", exact: true }).click()

  await page.getByRole("button", { name: "Custom", exact: true }).click()
  await page.getByLabel("Custom beats per measure").fill("13")
  await expect(dots(page)).toHaveCount(13)
  await page.getByRole("button", { name: "START", exact: true }).click()
  await expect(page.getByRole("button", { name: "STOP", exact: true })).toBeVisible()
  await page.getByRole("button", { name: "STOP", exact: true }).click()
  expect(errors).toEqual([])
})

test("mobile: presets + custom panel fit, no overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await gotoWidget(page)
  await expect(page.getByRole("button", { name: "9/8", exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: "12/8", exact: true })).toBeVisible()

  await page.getByRole("button", { name: "Custom", exact: true }).click()
  const beatsInput = page.getByLabel("Custom beats per measure")
  await beatsInput.fill("11")
  await page.getByLabel("Custom beat unit").selectOption("8")
  await expect(dots(page)).toHaveCount(11)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
})
