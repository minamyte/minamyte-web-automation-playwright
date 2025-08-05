class Utils {
  static resolveLocator(page, selector) {
    const parts = selector.split(':');
    const baseSelector = parts[0];
    const filters = parts.slice(1);
  
    let locator;
  
    if (baseSelector.startsWith('//') || baseSelector.startsWith('(')) {
      locator = page.locator(baseSelector); // XPath
    } else if (
      baseSelector.includes('#') ||
      baseSelector.startsWith('.') ||
      baseSelector.includes('[')
    ) {
      locator = page.locator(baseSelector); // CSS
    } else {
      locator = page.getByText(baseSelector); // Text selector
    }
  
    // Apply filters dynamically
    for (const filter of filters) {
      if (filter === 'visible') {
        locator = locator.filter({ hasText: /.*/ });
      } else if (filter.startsWith("has-text(")) {
        const match = filter.match(/has-text\(["'](.+?)["']\)/);
        if (match) {
          locator = locator.filter({ hasText: match[1] });
        }
      }
    }
  
    return locator;
  }
  
  
    static delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    static slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    }
  }
  
  module.exports = Utils;
  