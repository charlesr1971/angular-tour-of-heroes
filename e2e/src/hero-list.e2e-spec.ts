import { HeroListPage } from './hero-list.po';
import { browser, logging, by, element  } from 'protractor';

describe('HeroList Page', () => {

  let page: HeroListPage;

  beforeEach(() => {
    page = new HeroListPage();
  });

  it('should delete hero', () => {
    page.navigateTo();
    page.clickDelete();
    expect(page.getNamesList()).toEqual(element.all(by.css('.hero-list .mat-line')).first().getText());
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
