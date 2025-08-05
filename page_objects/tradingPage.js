// page_objects/LoginPage.js
const { loadElements } = require('../Engine/locators');

class TradingPage {
  constructor(page) {
    this.page = page;
    this.elements = loadElements(page, 'tradingPage');
    console.log(this.elements)
  }

  async clickExchangeFromDropDown(exchange){
    await this.elements.tradeButton.click();
    await this.elements.exchangeDropdown.click();
  }
}

module.exports = { TradingPage };
