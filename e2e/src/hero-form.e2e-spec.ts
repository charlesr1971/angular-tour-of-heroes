import { HeroFormPage } from './hero-form.po';
import { browser, logging } from 'protractor';

describe('HeroForm Page', () => {
  let page: HeroFormPage;

  beforeEach(() => {
    page = new HeroFormPage();
  });

  it('should save hero', () => {
    page.navigateTo();
    page.clickAddNewHero();
    page.setNewName('Spiderboy');
    page.clickSave();

    expect(page.getNamesList()).toEqual('Spiderboy');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
