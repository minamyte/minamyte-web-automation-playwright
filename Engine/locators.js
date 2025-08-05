const { BasePageObject } = require('./BasePageObject');
const { resolveLocator } = require('./utils');
const fs = require('fs');
const path = require('path');

function loadElements(page, locatorFileNameWithoutExtension) {
  const filePath = path.resolve(__dirname, `../locators/${locatorFileNameWithoutExtension}Locators.json`);
  const raw = fs.readFileSync(filePath);
  const selectors = JSON.parse(raw);

  const elements = {};

  for (const [key, selector] of Object.entries(selectors)) {
    const locator = resolveLocator(page, selector); // Use utility
    elements[key] = new BasePageObject(locator);    // Wrap with BasePageObject
  }

  return elements;
}

module.exports = { loadElements };
