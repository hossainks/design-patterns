import { test, expect } from "@playwright/test";

test("first test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle("Swag Labs");

  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
  await page.waitForTimeout(1000);
});
