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
    await tradingPage.elements.tradeButton.click();
  });

  test('User buys an Open Order on GOLD with 0.1 lot', async () => {
    await tradingPage.orderOpen();
  })

  test('User buys an Open Order on GOLD with minimum allowed lot size (e.g., 0.01)', async () => {
    await tradingPage.orderMinLot();
  })

  test('User buys an Open Order on GOLD with maximum allowed lot size (e.g., 50)', async () => {
    await tradingPage.orderMaxLot("50");
  })

  test('User Buys and Open Order on GOLD With 2 lot by clicking on + button', async () => {
    await tradingPage.orderOpenClickPlusButton();
  })
});
