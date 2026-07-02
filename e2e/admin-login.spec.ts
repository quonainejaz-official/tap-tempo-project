import { test, expect } from "@playwright/test"

test.describe("Admin Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/login")
  })

  test("should display the login form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Admin Login" })).toBeVisible()
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Password")).toBeVisible()
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible()
  })

  test("should show error on invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com")
    await page.getByLabel("Password").fill("wrongpassword")
    await page.getByRole("button", { name: "Sign In" }).click()
    await expect(page.getByText("Invalid credentials")).toBeVisible()
  })

  test("should navigate to admin dashboard after successful login", async ({ page }) => {
    await page.getByLabel("Email").fill("admin@example.com")
    await page.getByLabel("Password").fill("password123")
    await page.getByRole("button", { name: "Sign In" }).click()
    await expect(page).toHaveURL("/admin")
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()
  })
})
