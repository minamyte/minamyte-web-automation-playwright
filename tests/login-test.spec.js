// tests/login.spec.js
require('dotenv').config();
const { test } = require('@playwright/test');
const { LoginPage } = require('../page_objects/loginPage');
const username = process.env.MIFX_DEMO_USERNAME
const password = process.env.MIFX_DEMO_PASSWORD


test.describe('Login tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page); // Instantiate inside test context
    await loginPage.goto();
  });

  test('User can log in successfully', async () => {
    await loginPage.login(username, password);
  });

});
