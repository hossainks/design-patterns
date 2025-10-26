import { test as base } from "@playwright/test";

export const test = base.extend({
  credentials: async ({}, use) => {
    const loginData = { username: "standard_user", password: "secret_sauce" };
    await use(loginData);
  },
  verifiedUser: [
    async ({ page, credentials }, use) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator("#user-name").fill(credentials.username);
      await page.locator("#password").fill(credentials.password);
      await page.locator("#login-button").click();
      await page.waitForTimeout(1000);
      await use(page);
    },
    { auto: true },
  ],
});

export const expect = base.expect;
