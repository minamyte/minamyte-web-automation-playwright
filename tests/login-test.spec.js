// tests/login.spec.js
require('dotenv').config();
const { test } = require('@playwright/test');
const { LoginPage } = require('../page_objects/loginPage');
const username = process.env.mifx_demo_username
const password = process.env.mifx_demo_password


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
