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

  async expectNotVisible(){
    await expect(this.locator).toBeHidden();
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

  async expectComparisonByNumber(text, comparison = '>=') {
    const content = await this.locator.textContent();
    const contentToFloat = parseFloat(content.replace(/[($)\s]/g, ''));
    const target = parseFloat(text);
  
    switch (comparison) {
      case '>=':
        expect(contentToFloat).toBeGreaterThanOrEqual(target);
        break;
      case '<=':
        expect(contentToFloat).toBeLessThanOrEqual(target);
        break;
      case '>':
        expect(contentToFloat).toBeGreaterThan(target);
        break;
      case '<':
        expect(contentToFloat).toBeLessThan(target);
        break;
      case '=':
        expect(contentToFloat).toBeCloseTo(target); // or use toBe() if exact
        break;
      default:
        throw new Error(`Unsupported comparison operator: ${comparison}`);
    }
  }
}

module.exports = { BasePageObject };
