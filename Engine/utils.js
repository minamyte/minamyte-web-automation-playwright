class Utils {
    static resolveLocator(page, selector) {
      if (selector.startsWith('//') || selector.startsWith('(')) {
        // XPath
        return page.locator(selector);
      } else if (
        selector.startsWith('#') ||
        selector.startsWith('.') ||
        selector.includes('[')
      ) {
        // CSS selector
        return page.locator(selector);
      } else {
        // Assume text selector
        return page.getByText(selector);
      }
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
  