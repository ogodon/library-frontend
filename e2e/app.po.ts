import { protractor, browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url) {
    return browser.get(url);
  }

  getTitle() {
    return element(by.css('h1')).getText();
  }

  get(selector, number) {
    return element.all(by.css(selector)).get(number);
  }

  sleep(time) {
    browser.driver.sleep(time);
  }
}
