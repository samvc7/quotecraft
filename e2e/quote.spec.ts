import { test, expect } from "@playwright/test";

// TODO: implement
test("initial quote", async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("Filter quotes", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("button", { name: "Select Tags" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Select Authors" })
  ).toBeVisible();

  // When manually adding name to button component, locator is needed here rather than getByRole
  await expect(page.locator('button[name="Next Quote"]')).toBeVisible();
});
