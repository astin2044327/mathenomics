import { test, expect } from "@playwright/test";

test.describe("Mathenomics smoke", () => {
  test("home loads with library and globe menu", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".brand-hero")).toContainText("Mathenomics");
    await expect(page.locator(".grades .grade").first()).toBeVisible();
    await page.locator(".lang-drop-btn").click();
    await expect(page.locator(".lang-drop")).toBeVisible();
    await expect(page.locator('.lang-opt[data-lang="hi"]')).toBeVisible();
    await page.locator('.lang-opt[data-lang="es"]').click();
    await expect(page.locator(".section-title")).toBeVisible();
  });

  test("open a grade map and a lesson without crashing", async ({ page }) => {
    await page.goto("/#/g/g3");
    await expect(page.locator(".map, .course-head")).toBeVisible();
    const first = page.locator(".stop").first();
    await expect(first).toBeVisible();
    await first.click();
    await expect(page.locator(".phrase, .lesson")).toBeVisible();
    await expect(page.locator("#hear")).toBeVisible();
  });

  test("kids corner stays reachable", async ({ page }) => {
    await page.goto("/#/kids");
    await expect(page.locator(".kid-sets, .kids-band, h1, .lede").first()).toBeVisible();
  });
});
