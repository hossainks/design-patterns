import { test, expect } from "../custom-fixtures/testData.js";

test("Second test using simple Fixture", async ({ page }) => {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
  await page.waitForTimeout(1000);
});

test("Third test testing Fixture behaviour", async ({ verifiedUser }) => {
  const page = verifiedUser;
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
  await page.waitForTimeout(1000);
});
