import { test, expect, type Page } from "@playwright/test"

test.describe.configure({ mode: "serial" })

async function gotoWidget(page: Page, route = "/metronome") {
  await page.goto(route, { waitUntil: "networkidle" })
  await expect(page.locator("span.font-mono.text-3xl")).toBeVisible({ timeout: 10000 })
}

async function dotMetrics(page: Page) {
  return page.locator('button[title^="Beat "]').evaluateAll(els =>
    els.map(el => {
      const r = el.getBoundingClientRect()
      return {
        top: Math.round(r.top),
        left: Math.round(r.left),
        w: Math.round(r.width * 10) / 10,
        h: Math.round(r.height * 10) / 10,
      }
    })
  )
}

function rowsOf(metrics: { top: number }[]): number[] {
  const tops = [...new Set(metrics.map(m => m.top))].sort((a, b) => a - b)
  return tops.map(t => metrics.filter(m => m.top === t).length)
}

test("custom counts wrap at 12 per row, dots unchanged in size", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)

  const cases: Record<number, number[]> = {
    5: [5],
    7: [7],
    9: [9],
    12: [12],
    13: [12, 1],
    18: [12, 6],
    20: [12, 8],
    32: [12, 12, 8],
  }

  for (const n of Object.keys(cases).map(Number)) {
    await page.getByRole("button", { name: "Custom", exact: true }).click()
    await page.getByLabel("Custom beats per measure").fill(String(n))
    await expect(page.locator('button[title^="Beat "]')).toHaveCount(n)
    const metrics = await dotMetrics(page)

    expect(rowsOf(metrics), `row layout for ${n} beats`).toEqual(cases[n])

    for (const d of metrics) {
      expect(d.w, `dot width for ${n} beats`).toBeGreaterThan(15.4)
      expect(d.w, `dot width for ${n} beats`).toBeLessThan(16.6)
      expect(d.h, `dot height for ${n} beats`).toBeGreaterThan(15.4)
      expect(d.h, `dot height for ${n} beats`).toBeLessThan(16.6)
    }

    await page.getByRole("button", { name: "4/4", exact: true }).click()
    await expect(page.locator('button[title^="Beat "]')).toHaveCount(4)
  }
})

test("presets 2/4 through 12/8 stay on a single centered row", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await gotoWidget(page)

  const presets: [string, number][] = [
    ["2/4", 2], ["3/4", 3], ["4/4", 4], ["5/4", 5],
    ["6/8", 6], ["7/8", 7], ["9/8", 9], ["12/8", 12],
  ]

  for (const [sig, n] of presets) {
    await page.getByRole("button", { name: sig, exact: true }).click()
    await expect(page.locator('button[title^="Beat "]')).toHaveCount(n)
    const metrics = await dotMetrics(page)
    expect(rowsOf(metrics), `${sig} should render on one row`).toEqual([n])
  }

  const container = page.locator('button[title^="Beat "]').first().locator("xpath=..")
  const cs = await container.evaluate(el => {
    const s = getComputedStyle(el)
    return { gap: s.gap, justifyContent: s.justifyContent, flexWrap: s.flexWrap }
  })
  expect(cs.gap).toBe("12px")
  expect(cs.justifyContent).toBe("center")
  expect(cs.flexWrap).toBe("wrap")
})