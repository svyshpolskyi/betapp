import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get("/");
  }

  getParagraphText() {
    return element(by.css("app-root h1")).getText();
  }

  getCurrentUrl() {
    return browser.driver.getCurrentUrl();
  }

  getPersonalButton() {
    return element(by.css(".personalPage"));
  }
}
