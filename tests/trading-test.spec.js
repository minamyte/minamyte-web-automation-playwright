// tests/login.spec.js
require('dotenv').config();
const { test } = require('@playwright/test');
const { LoginPage } = require('../page_objects/loginPage');
const { TradingPage } = require('../page_objects/tradingPage');
const username = process.env.mifx_demo_username
const password = process.env.mifx_demo_password


test.describe('Trading tests', () => {
  let loginPage;
  let tradingPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tradingPage = new TradingPage(page) // Instantiate inside test context
    await loginPage.goto();
    await loginPage.login(username, password);
  });

  test('User selects S&P 500 from Exchange list dropdown by clicking', async () => {
    await tradingPage.clickExchangeFromDropDown("S&P 500")
  })
});
