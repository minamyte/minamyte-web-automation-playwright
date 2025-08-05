// page_objects/LoginPage.js
const { loadElements } = require('../Engine/locators');

class TradingPage {
  constructor(page) {
    this.page = page;
    this.elements = loadElements(page, 'tradingPage');
    console.log(this.elements)
  }

  async clickExchangeFromDropDown(exchange){
    await this.elements.exchangeOption.click();
    await this.elements.exchangeOption.selectOption(exchange);
  }

  async orderOpen(){
    await this.elements.orderButton.click();
    await this.elements.lotValidate.expectTextEqual("buy 0.1 Lot");
  }

  async orderMinLot(){

    await this.elements.minusLotButton.clickrepeat(8)
    await this.elements.orderButton.click();
  }

  async orderMaxLot(lot){
    await this.elements.inputQtyLot.fill(lot);
    await this.elements.orderButton.click();
    //await this.elements.lotValidate.expectTextEqual("buy " + lot + " lot");
  }

  async orderOpenClickPlusButton(){
    await this.elements.plusLotButton.clickrepeat(9)
    await this.elements.orderButton.click();
    await this.elements.lotValidate.expectTextEqual("buy 2 Lot")
  }
}

module.exports = { TradingPage };
