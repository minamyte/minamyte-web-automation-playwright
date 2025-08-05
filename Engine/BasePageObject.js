const { expect } = require('@playwright/test');

class BasePageObject {
  constructor(locator) {
    this.locator = locator;
  }

  async click() {
    await this.locator.click();
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

  async getTextContent() {
    return await this.locator.textContent();
  }
}

module.exports = { BasePageObject };
