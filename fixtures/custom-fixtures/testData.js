import { test as base } from "@playwright/test";

export const test = base.extend({
  credentials: async ({}, use) => {
    const loginData = { username: "standard_user", password: "secret_sauce" };
    await use(loginData);
  },
});

export const expect = base.expect;
