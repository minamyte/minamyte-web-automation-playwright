// page_objects/LoginPage.js
const { loadElements } = require('../Engine/locators');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.elements = loadElements(page, 'loginPage');
    console.log(this.elements)
  }

  async goto() {
    await this.page.goto('https://mifx.com');
  }

  async login(username, password) {
    await this.elements.loginButtonHome.click()
    await this.elements.usernameInput.fill(username);
    await this.elements.passwordInput.fill(password);
    await this.elements.loginButton.click();
    await this.elements.infoDana.expectVisible()
  }
}

module.exports = { LoginPage };
