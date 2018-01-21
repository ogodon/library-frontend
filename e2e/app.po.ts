import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url) {
    return browser.get(url);
  }

  getTitle() {
    return element(by.css('h1')).getText();
  }
}
