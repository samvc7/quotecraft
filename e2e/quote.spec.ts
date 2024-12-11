import { test, expect } from "@playwright/test";

test("Initial quote", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const quote = await page.getByRole("blockquote").textContent();
  expect(quote).not.toBeNull();
  expect(quote).not.toBe("");
});

test("Filter quotes visible", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("button", { name: "Select Tags" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Select Authors" })
  ).toBeVisible();

  // When manually adding name to button component, locator is needed here rather than getByRole
  await expect(page.locator('button[name="Next Quote"]')).toBeVisible();
});

test("Next quote", async ({ page }) => {
  await page.goto("http://localhost:3000");

  for (let i = 0; i < 10; i++) {
    const quoteBefore = await page.getByRole("blockquote").textContent();
    await page.locator('button[name="Next Quote"]').click();
    const quoteAfter = await page.getByRole("blockquote").textContent();

    expect(quoteBefore).not.toEqual(quoteAfter);
  }
});

// TODO: test in combination with next quote button
test("Filter by tags", async ({ page }) => {
  await page.goto("http://localhost:3000");

  expect(page.getByRole("button", { name: "Life Love" })).not.toBeVisible();

  await page.getByRole("button", { name: "Select Tags" }).click();
  await page.getByRole("option", { name: "Life" }).click();
  await page.getByRole("option", { name: "Love" }).click();
  await page.getByRole("blockquote").click();

  await expect(page.getByRole("button", { name: "Life Love" })).toBeVisible();
});

test("Filter by authors", async ({ page }) => {
  await page.goto("http://localhost:3000");

  expect(page.getByRole("button", { name: "Shakespeare" })).not.toBeVisible();

  await page.getByRole("button", { name: "Select Authors" }).click();
  await page.getByRole("option", { name: "Shakespeare" }).click();
  await page.getByRole("blockquote").click({ position: { x: 0, y: 0 } });

  await expect(page.getByRole("button", { name: "Shakespeare" })).toBeVisible();

  await expect(page.getByRole("blockquote")).toContainText("Shakespeare");
});

test("Filter not found", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: "Select Tags" }).click();
  await page.getByRole("option", { name: "Life" }).click();
  await page.getByRole("option", { name: "Love" }).click();
  await page.getByRole("option", { name: "Change" }).click();
  await page.getByRole("blockquote").click();

  await expect(page.getByRole("blockquote")).toContainText("No quotes found");
});
