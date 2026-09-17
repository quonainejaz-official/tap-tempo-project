import { test, expect, Page } from "@playwright/test"

async function gotoWidget(page: Page, route = "/metronome-with-subdivisions") {
  await page.addInitScript(() => {
    const w = window as unknown as { __ctxLog: number[]; AudioContext: typeof AudioContext; webkitAudioContext?: typeof AudioContext }
    w.__ctxLog = []
    const Native = w.AudioContext
    const Wrapped = class extends Native {
      createOscillator() {
        const osc = super.createOscillator()
        const origStart = osc.start.bind(osc)
        osc.start = (when?: number) => {
          w.__ctxLog.push(Number(when ?? this.currentTime))
          return origStart(when as number)
        }
        return osc
      }
    }
    w.AudioContext = Wrapped as unknown as typeof AudioContext
    if (w.webkitAudioContext) w.webkitAudioContext = Wrapped as unknown as typeof AudioContext
  })
  await page.goto(route, { waitUntil: "networkidle" })
  await expect(page.locator("span.font-mono.text-3xl")).toBeVisible({ timeout: 10000 })
}

async function captureGaps(page: Page, ms = 2600): Promise<number[]> {
  await page.evaluate(() => { (window as unknown as { __ctxLog: number[] }).__ctxLog = [] })
  await page.getByRole("button", { name: "START", exact: true }).click()
  await page.waitForTimeout(ms)
  await page.getByRole("button", { name: "STOP", exact: true }).click()
  await page.waitForTimeout(150)
  return page.evaluate(() => {
    const log = (window as unknown as { __ctxLog: number[] }).__ctxLog
    const gaps: number[] = []
    for (let i = 1; i < log.length; i++) gaps.push(Number((log[i] - log[i - 1]).toFixed(4)))
    return gaps
  })
}

function expectPattern(gaps: number[], long: number, short: number) {
  const head = gaps.slice(1, 9)
  expect(head.length, "not enough clicks captured").toBeGreaterThanOrEqual(6)
  for (const g of head) {
    const nearest = Math.min(Math.abs(g - long), Math.abs(g - short))
    expect(nearest, `gap ${g} not near ${long} or ${short}`).toBeLessThan(0.035)
  }
  if (Math.abs(long - short) > 0.02) {
    const kinds = head.map(g => (Math.abs(g - long) <= Math.abs(g - short) ? "L" : "S"))
    for (let i = 1; i < kinds.length; i++) {
      expect(kinds[i], `gaps did not alternate: ${kinds.join("")}`).not.toBe(kinds[i - 1])
    }
  }
}

const subdivisionsGroup = (page: Page) =>
  page.getByRole("button", { name: "None", exact: true }).locator("..")
const swingGroup = (page: Page) =>
  page.getByRole("button", { name: "Straight", exact: true }).locator("..")
const divider = (page: Page) => page.locator("div.lg\\:col-span-7 div.bg-border")

test.describe.configure({ mode: "serial" })

test("three-row layout: aligned headings, shared buttons row, single divider", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)

  const subLabels = await subdivisionsGroup(page).locator("button").allTextContents()
  expect(subLabels).toEqual(["None", "1/4", "1/8", "1/3", "1/16"])
  expect(subLabels).not.toContain("Shuffle")

  const swingLabels = await swingGroup(page).locator("button").allTextContents()
  expect(swingLabels).toEqual(["Straight", "Triplet", "Dotted", "Swing"])

  const sh = await page.locator("span", { hasText: /^Subdivisions$/ }).boundingBox()
  const wh = await page.locator("span", { hasText: /^Swing$/ }).boundingBox()
  const nb = await page.getByRole("button", { name: "None", exact: true }).boundingBox()
  const sb = await page.getByRole("button", { name: "Straight", exact: true }).boundingBox()
  const lb = await page.getByRole("slider", { name: "Swing amount" }).boundingBox()
  for (const b of [sh, wh, nb, sb, lb]) expect(b).not.toBeNull()

  // exactly three rows: headings -> buttons -> slider
  expect(nb!.y).toBeGreaterThan(sh!.y + sh!.height / 2)
  expect(lb!.y).toBeGreaterThan(nb!.y + nb!.height / 2)

  // headings share one row, each left-aligned above its own button group
  expect(Math.abs(sh!.y - wh!.y)).toBeLessThan(4)
  expect(Math.abs(sh!.x - nb!.x)).toBeLessThan(2)
  expect(Math.abs(wh!.x - sb!.x)).toBeLessThan(2)

  // both button groups live on the same row
  expect(Math.abs(nb!.y - sb!.y)).toBeLessThan(2)
  expect(sb!.x).toBeGreaterThan(nb!.x)

  // one divider, positioned in the buttons row between the two groups (none between headings)
  await expect(divider(page)).toHaveCount(1)
  const db = await divider(page).boundingBox()
  expect(db).not.toBeNull()
  expect(Math.abs(db!.y - nb!.y)).toBeLessThan(6)
  expect(db!.x).toBeGreaterThan(nb!.x)
  expect(db!.x).toBeLessThan(sb!.x)

  await expect(page.getByText("50%", { exact: true })).toBeVisible()
  await expect(page.locator('button[aria-pressed="true"]')).toHaveText("Straight")
})

test("three-row layout stacks gracefully on narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await gotoWidget(page)

  const sh = await page.locator("span", { hasText: /^Subdivisions$/ }).boundingBox()
  const wh = await page.locator("span", { hasText: /^Swing$/ }).boundingBox()
  const nb = await page.getByRole("button", { name: "None", exact: true }).boundingBox()
  const sb = await page.getByRole("button", { name: "Straight", exact: true }).boundingBox()
  for (const b of [sh, wh, nb, sb]) expect(b).not.toBeNull()

  // stacked order: Subdivisions heading -> its buttons -> Swing heading -> its buttons
  expect(nb!.y).toBeGreaterThan(sh!.y + sh!.height / 2)
  expect(wh!.y).toBeGreaterThan(nb!.y + nb!.height / 2)
  expect(sb!.y).toBeGreaterThan(wh!.y + wh!.height / 2)

  // inter-group divider is hidden when stacked, and nothing overflows
  await expect(divider(page)).toBeHidden()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()

  // controls still work on mobile
  await page.getByRole("button", { name: "Swing", exact: true }).click()
  await expect(page.getByText("66.7%", { exact: true })).toBeVisible()
  await expect(page.locator('button[aria-pressed="true"]')).toHaveText("Swing")
  await page.getByRole("button", { name: "1/8", exact: true }).click()
  await expect(page.locator('button[aria-pressed="true"]')).toHaveText("Swing")
})

test("preset clicks set percentage and active state", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)

  await swingGroup(page).getByRole("button", { name: "Triplet", exact: true }).click()
  await expect(page.getByText("66.7%", { exact: true })).toBeVisible()
  await expect(page.locator('button[aria-pressed="true"]')).toHaveText("Triplet")

  await swingGroup(page).getByRole("button", { name: "Dotted", exact: true }).click()
  await expect(page.getByText("75%", { exact: true })).toBeVisible()
  await expect(page.locator('button[aria-pressed="true"]')).toHaveText("Dotted")

  await swingGroup(page).getByRole("button", { name: "Swing", exact: true }).click()
  await expect(page.getByText("66.7%", { exact: true })).toBeVisible()
  await expect(page.locator('button[aria-pressed="true"]')).toHaveText("Swing")

  await swingGroup(page).getByRole("button", { name: "Straight", exact: true }).click()
  await expect(page.getByText("50%", { exact: true })).toBeVisible()
})

test("1/8 subdivision timing follows swing: straight, triplet, dotted", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)
  await page.getByRole("button", { name: "1/8", exact: true }).click()

  await swingGroup(page).getByRole("button", { name: "Straight", exact: true }).click()
  expectPattern(await captureGaps(page), 0.25, 0.25)

  await swingGroup(page).getByRole("button", { name: "Triplet", exact: true }).click()
  expectPattern(await captureGaps(page), 0.3333, 0.1667)

  await swingGroup(page).getByRole("button", { name: "Dotted", exact: true }).click()
  expectPattern(await captureGaps(page), 0.375, 0.125)
})
