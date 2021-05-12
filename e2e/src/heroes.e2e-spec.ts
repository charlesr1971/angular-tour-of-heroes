import { HeroesPage } from './heroes.po';
import { browser, logging, by, element  } from 'protractor';

describe('Heroes Page', () => {

  let page: HeroesPage;

  beforeEach(() => {
    page = new HeroesPage();
  });

  it('should edit hero', async () => {
    page.navigateToStart();
    page.clickSelect();
    page.clickViewDetails();
    const nameValueRawBefore: any = await page.getNameBefore();
    const nameValueBefore: any = nameValueRawBefore.replace(/^(.*)(Edited)*$/igm,'$1 Edited').replace(/^(.*)(Edited)+$/igm,'$1 Edited').replace(/[\s]+/igm,' ');
    page.setNewName(nameValueBefore);
    page.clickSave();
    const nameValueAfter: any = page.getNameAfter();
    page.navigateToEnd();
    expect(nameValueAfter).toEqual(element.all(by.css('.hero-list .mat-line')).first().getText());
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
