import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('library-frontend-new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('Homepage', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should display the application title', () => {
      page.navigateTo('/');
      expect(page.getTitle()).toEqual('Movies Library');
    });
  });

  describe('Create an account', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should have a button to create an account', () => {
      expect(page.get('button', 1).getText()).toEqual('Create an account');
    });

    it('should redirect to /signup when clicking this button', () => {
      page.get('button', 1).click();
      page.sleep(1000);
      expect(browser.getCurrentUrl()).toContain('/signup');
    });
  });

  describe('Try to reach /movies without been connected', () => {
    beforeEach(() => {
      page.sleep(2000);
      page.navigateTo('/');
      page.sleep(5000);
    });

    it('should go back to /signin', () => {
      expect(browser.getCurrentUrl()).toContain('/signin');
      page.sleep(2000);
      page.navigateTo('/movies');
      page.sleep(2000);
      expect(browser.getCurrentUrl()).toContain('/signin');
    });
  });

  describe('Create an account', () => {
    beforeEach(() => {
      page.sleep(2000);
      page.navigateTo('/signin');
      browser.waitForAngular();
      page.sleep(5000);
      page.get('button', 1).click();
      browser.waitForAngular();
      page.sleep(5000);
    });

    it('should display an error if email is not correct', () => {
      page.get('input', 0).sendKeys('bad.email@domain');
      expect(page.get('.error', 1).getText()).toEqual('Email should be valid');
    });

    it('should display an error if password and password confirmation are not the same', () => {
      page.get('input', 0).sendKeys('right.email@domain.com');
      page.get('input', 1).sendKeys('password');
      page.get('input', 2).sendKeys('passwrod');
      expect(page.get('.error', 1).getText()).toEqual('Password and password confirmation should be identical');
    });

    it('should display an error if password and confirmation are too short', () => {
      page.get('input', 0).sendKeys('right.email@domain.com');
      page.get('input', 1).sendKeys('passwd');
      page.get('input', 2).sendKeys('passwd');
      expect(page.get('.error', 1).getText()).toEqual('Password should have at least 8 characters');
    });

    it('should connect if all is ok', () => {
      const email = `right.email.${Date.now()}@domain.com`;
      page.get('input', 0).sendKeys(email);
      page.get('input', 1).sendKeys('password');
      page.get('input', 2).sendKeys('password');
      page.get('button', 0).click();
      browser.waitForAngular();
      page.sleep(5000);
      expect(browser.getCurrentUrl()).toContain('/movies');
      expect(page.get('span', 0).getText()).toEqual(`Logged as: ${email}`);
    });
  });
});
