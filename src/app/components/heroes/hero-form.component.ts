import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Store} from '@ngrx/store';

@Component({
    selector: 'rx-hero-form',
    templateUrl: './hero-form.component.html',
    styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {
    @Input() addingHero = false;
    _hero: any;
    @Input() set hero(value) {
      this._hero = Object.assign({}, value);
    }
    get hero() {
        return this._hero;
    }
    addLoader = false;
    debug = false;
    @Output() back = new EventEmitter();
    @Output() save = new EventEmitter();

    constructor(private store: Store<any>) {
      this.store.select('addSpinner').subscribe( ( bool ) => {
        if (this.debug) {
          console.log('HeroFormComponent.component: constructor: bool: ', bool);
        }
        this.addLoader = bool;
      })
    }

}
