import { browser, by, element } from 'protractor';

export class HeroListPage {

    navigateTo(){
        return browser.get('/heroes');
    }

    clickDelete() {
      element(by.id('delete-button-0')).click();
    }

    getNamesList() {
      return element.all(by.css('.hero-list .mat-line')).first().getText();
    }

}
