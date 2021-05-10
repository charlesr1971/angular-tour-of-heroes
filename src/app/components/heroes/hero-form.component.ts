import {Component, Input, Output, EventEmitter} from '@angular/core';

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

    @Output() back = new EventEmitter();
    @Output() save = new EventEmitter();
}
