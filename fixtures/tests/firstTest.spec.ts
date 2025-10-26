import { test, expect } from "../custom-fixtures/testData.js";

test("first test", async ({ page, credentials }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle("Swag Labs");

  await page.locator("#user-name").fill(credentials.username);
  await page.locator("#password").fill(credentials.password);
  await page.locator("#login-button").click();
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
  await page.waitForTimeout(1000);
});
