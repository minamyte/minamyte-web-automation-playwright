// page_objects/LoginPage.js
const { loadElements } = require('../Engine/locators');

class TradingPage {
  constructor(page) {
    this.page = page;
    this.elements = loadElements(page, 'tradingPage');
  }

  async clickExchangeFromDropDown(exchange) {
    await this.elements.exchangeOption.click();
    await this.elements.exchangeOption.selectOption(exchange);
  }

  async orderOpen(direction, lot) {
    console.log(direction)
    if (direction == "sell") {
      await this.page.waitForTimeout(1000);
      await this.elements.directionSell.click();
    }
    await this.elements.orderButton.click();
    await this.elements.lotValidate.expectTextEqual(direction + " " + lot + " Lot");
  }

  async orderMinLot(direction, lot) {
    if (direction == "sell") {
      await this.page.waitForTimeout(1000);
      await this.elements.directionSell.click();
    }
    await this.elements.minusLotButton.clickrepeat(8)
    await this.elements.orderButton.click();
    await this.elements.lotValidate.expectTextEqual(direction + " " + lot + " Lot");
  }

  async orderMaxLot(direction, lot) {
    if (direction == "sell") {
      await this.page.waitForTimeout(1000);
      await this.elements.directionSell.click();
    }
    await this.elements.inputQtyLot.fill(lot);
    await this.elements.orderButton.click();
    //await this.elements.lotValidate.expectTextEqual("buy " + lot + " lot");
  }

  async orderOpenClickPlusButton(direction, lot) {
    console.log(direction)
    if (direction == "sell") {
      console.log("masuk")
      await this.page.waitForTimeout(1000);
      await this.elements.directionSell.click();
    }
    await this.elements.plusLotButton.clickrepeat(9)
    await this.elements.orderButton.click();
    await this.elements.lotValidate.expectTextEqual(direction + " " + lot + " Lot");
  }

  async orderOpenSetTPSL(direction = "buy", goal = "tp", targetTp, targetSl = null) {
    let actualTP
    let actualSL
    if (direction == "sell") {
      await this.page.waitForTimeout(1000);
      await this.elements.directionSell.click();
    }

    const parseValue = (text) => parseFloat(text.replace(/[$\s]/g, ''));

    const config = {
      tp: {
        toggle: this.elements.takeProfitToggle,
        textElement: this.elements.tpGainText,
        button: this.elements.tpPlusPriceButton,
        condition: (current, target) => current < target
      },
      sl: {
        toggle: this.elements.stopLossToggle,
        textElement: this.elements.slLossText,
        button: this.elements.slMinusPriceButton,
        condition: (current, target) => current > target
      }
    };

    if (goal === "both") {

      const tpTarget = parseFloat(targetTp);
      const slTarget = parseFloat(targetSl);

      await config.tp.toggle.click();
      let tpValue = parseValue(await config.tp.textElement.getTextContent());
      while (config.tp.condition(tpValue, tpTarget)) {
        await config.tp.button.click();
        tpValue = parseValue(await config.tp.textElement.getTextContent());
      }

      await config.sl.toggle.click();
      let slValue = parseValue(await config.sl.textElement.getTextContent());
      while (config.sl.condition(slValue, slTarget)) {
        await config.sl.button.click();
        slValue = parseValue(await config.sl.textElement.getTextContent());
      }
      actualTP = tpValue
      actualSL = slValue
    } else {

      const goalConfig = config[goal];
      if (!goalConfig) {
        throw new Error(`Invalid goal: '${goal}'. must be "sl", "tp", or "both"`);
      };

      const targetFloat = parseFloat(targetTp);

      await goalConfig.toggle.click();
      let currentValue = parseValue(await goalConfig.textElement.getTextContent());

      while (goalConfig.condition(currentValue, targetFloat)) {
        await goalConfig.button.click();
        currentValue = parseValue(await goalConfig.textElement.getTextContent());
      }
      actualTP = currentValue
    }

    await this.elements.orderButton.click();
    await this.page.waitForTimeout(2000);

    if (goal === "tp")
      await this.elements.tpOrderText.expectComparisonByNumber((actualTP-2).toString(), ">=")

    else if (goal === "sl")
      await this.elements.slOrderText.expectComparisonByNumber((actualTP-2).toString(), "<=")

    else {
      await this.elements.tpOrderText.expectComparisonByNumber((actualTP-2).toString(), ">=")
      await this.elements.slOrderText.expectComparisonByNumber((actualSL+2).toString(), "<=")
    }

    await this.elements.lotValidate.expectTextEqual(direction + " 0.1 Lot");
  }

  async orderOpenNegativeLot(direction = "buy", lot){
    if (direction == "sell") {
      await this.page.waitForTimeout(1000);
      await this.elements.directionSell.click();
    }
    await this.elements.inputQtyLot.fill(lot);
    await this.elements.orderButton.click();
    await this.elements.lotValidate.expectNotVisible();
    await this.elements.errorPopUp.expectVisible();
    await this.elements.errorPopUp.expectTextEqual("Invalid Parameters");
  }
}

module.exports = { TradingPage };
