const { expect } = require('@playwright/test');

class BasePageObject {
  constructor(locator) {
    this.locator = locator;
  }

  async click() {
    await this.locator.click();
  }

  async clickrepeat(times){
    let i = 0
    do {
      await this.locator.click();
      i++;
    } while (i<times)
  }

  async fill(value) {
    await this.locator.fill(value);
  }

  async expectVisible() {
    await expect(this.locator).toBeVisible();
  }

  async expectTextContains(text) {
    const content = await this.locator.textContent();
    expect(content).toContain(text);
  }

  async expectTextEqual(text) {
    const content = await this.locator.textContent();
    expect(content).toEqual(text);
  }

  async getTextContent() {
    return await this.locator.textContent();
  }

  async selectOption(value){
    await this.locator.selectOption(value)
  }

}

module.exports = { BasePageObject };
