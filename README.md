# Playwright Fixtures: Design Pattern Example

This project demonstrates how to use **Playwright’s fixture system** to build clean, reusable, and maintainable test architectures. Fixtures help manage setup and teardown logic, isolate test contexts, and reduce repetition — all critical for scaling test automation efficiently.

---

## 📁 Project Structure for fixtures

```
design-patterns/
├── fixtures/
│   ├── custom-fixtures/
│   │   └── testData.js
│   ├── tests/
│   │   ├── firstTest.spec.js
│   │   └── secondTest.spec.js
│   ├── playwright.config.ts
│   └── package.json
├── node_modules/
├── package-lock.json
├── package.json
└── README.md
```

---

## 🧩 What Are Fixtures in Playwright?

Fixtures are **reusable components** that manage setup and teardown logic across tests.
They ensure your tests are:

- **Isolated** — no shared state between tests.
- **Reusable** — define once, use anywhere.
- **Maintainable** — centralize environment setup logic.

Playwright provides a `test.extend()` API that allows you to define custom fixtures (e.g., test data, authenticated users, mock services).

---

## ⚙️ Custom Fixture Implementation

**File:** `fixtures/custom-fixtures/testData.js`

```js
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
```

### Explanation

- **`credentials` Fixture:**
  Provides login data (`username` and `password`) to any test that requires authentication.

- **`verifiedUser` Fixture:**
  Automates login before tests run, then supplies the logged-in `page` context.
  This allows tests to start from an authenticated state — no duplicate login steps.

---

## 🧪 Example Tests

### 1️⃣ First Test — Using `credentials`

```js
import { test, expect } from "../custom-fixtures/testData.js";

test("first test using simple Fixture", async ({ page, credentials }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle("Swag Labs");

  await page.locator("#user-name").fill(credentials.username);
  await page.locator("#password").fill(credentials.password);
  await page.locator("#login-button").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
});
```

### 2️⃣ Second Test — Using `verifiedUser`

```js
import { test, expect } from "../custom-fixtures/testData.js";

test("Second test using simple Fixture", async ({ page }) => {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
});

test("Third test testing Fixture behaviour", async ({ verifiedUser }) => {
  const page = verifiedUser;
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  const header = page.locator(".app_logo");
  await expect(header).toHaveText("Swag Labs");
});
```

---

## 💡 Why This Matters

Without fixtures, every test would need to:

- Create its own browser and page context.
- Log in manually.
- Manage setup/teardown code individually.

With fixtures:

- **Test logic stays focused** on behavior, not setup.
- **Login flow** is handled once in the fixture, not duplicated in tests.
- **Parallelization** becomes easier — each test runs in an isolated environment.
- **Scalability** improves as the framework grows.

---

## 🧠 Key Takeaways

| Concept                              | Benefit                                                                |
| ------------------------------------ | ---------------------------------------------------------------------- |
| **Custom Fixtures**                  | Centralize and reuse logic like authentication or test data.           |
| **`use()` function**                 | Controls when a fixture is available to the test.                      |
| **Auto Fixtures (`{ auto: true }`)** | Automatically execute fixture setup before each test.                  |
| **Destructuring in Tests**           | Extracts only the required fixtures cleanly (`{ page, credentials }`). |

---

## 🚀 Run the Tests

Move into the fixture workspace folder:

```bash
cd fixtures
```

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Generate report:

```bash
npx playwright show-report
```

---

## 🧭 Summary

This setup showcases a **fixture-driven design pattern** in Playwright — a scalable approach where environment setup, authentication, and data management are abstracted into composable units.
By structuring tests this way, you ensure **clarity, reusability, and reliability** as your automation framework evolves.
