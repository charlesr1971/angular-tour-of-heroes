import { browser, by, element } from 'protractor';

export class HeroesPage {

    navigateToStart(){
        return browser.get('/heroes');
    }

    clickSelect() {
      element(by.id('select-item-0')).click();;
    }

    clickViewDetails() {
      element(by.id('viewDetails')).click();
    }

    getNameBefore() {
      return element(by.id('name')).getAttribute('value');
    }

    setNewName(name: string) {
      element(by.id('name')).sendKeys(name);
    }

    clickSave() {
      element(by.id('save')).click();
    }

    getNameAfter() {
      return element(by.id('name')).getAttribute('value');
    }

    navigateToEnd(){
        return browser.get('/heroes');
    }

}
