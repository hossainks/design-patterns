import { test as base } from "@playwright/test";
import { Login } from "../page-objects/login";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new Login(page);
    await use(loginPage);
  },
});

export const expect = base.expect;
