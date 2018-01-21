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

});
