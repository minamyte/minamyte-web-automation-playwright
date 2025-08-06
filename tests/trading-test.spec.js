// tests/login.spec.js
require('dotenv').config();
const { test } = require('@playwright/test');
const { LoginPage } = require('../page_objects/loginPage');
const { TradingPage } = require('../page_objects/tradingPage');
const username = process.env.MIFX_DEMO_USERNAME
const password = process.env.MIFX_DEMO_PASSWORD


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
    await tradingPage.orderOpen("buy", "0.1");
  })

  test('User buys an Open Order on GOLD with minimum allowed lot size (e.g., 0.01)', async () => {
    await tradingPage.orderMinLot("buy", "0.02");
  })

  test('User buys an Open Order on GOLD with maximum allowed lot size (e.g., 50)', async () => {
    await tradingPage.orderMaxLot("buy", "50");
  })

  test('User sells an Open Order on GOLD With 1 lot by clicking on + button', async () => {
    await tradingPage.orderOpenClickPlusButton("sell","1");
  })

  test('User sells an Open Order on GOLD with 0.1 lot', async () => {
    await tradingPage.orderOpen("sell", "0.1");
  })

  test('User sells an Open Order on GOLD with minimum allowed lot size (e.g., 0.01)', async () => {
    await tradingPage.orderMinLot("sell", "0.02");
  })

  test('User sells an Open Order on GOLD with maximum allowed lot size (e.g., 50)', async () => {
    await tradingPage.orderMaxLot("sell", "50");
  })

  test('User buys an Open Order on GOLD and adds a Take Profit that results in $30 estimated gain.', async () => {
    await tradingPage.orderOpenSetTPSL("buy", "tp", "30");
  })

  test('User buys an Open Order on GOLD and adds a Stop Loss that results in $10 estimated loss.', async () => {
    await tradingPage.orderOpenSetTPSL("buy", "sl", "-10");
  })

  test('User buys an Open Order on GOLD and adds both TP and SL simultaneously', async () => {
    await tradingPage.orderOpenSetTPSL("buy", "both", "10", "-10");
  })

  test('User buys Open Order on EURUSD with negative lot (-1)', async () => {
    await tradingPage.orderOpenNegativeLot("buy", "-1");
  })
});
