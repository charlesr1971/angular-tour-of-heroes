import { browser, by, element } from 'protractor';

export class HeroFormPage {

    navigateTo(){
        return browser.get('/heroes');
    }

    clickAddNewHero() {
      element(by.id('addNewHero')).click();
    }

    setNewName(name: string) {
      element(by.id('name')).sendKeys(name);
    }

    clickSave() {
      element(by.id('save')).click();
    }

    getNamesList() {
      return element.all(by.css('.hero-list .mat-line')).first().getText();
    }

}
