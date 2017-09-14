import { NgRosterPage } from './app.po';

describe('ng-roster App', () => {
  let page: NgRosterPage;

  beforeEach(() => {
    page = new NgRosterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
