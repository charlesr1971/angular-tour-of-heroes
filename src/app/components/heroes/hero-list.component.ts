import {Component, Input, Output, EventEmitter } from '@angular/core';
import {Store} from '@ngrx/store';
import { Hero } from 'src/app/models';
import {HeroActions} from '../../actions';

@Component({
    selector: 'rx-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent {
    @Input() heroes;
    @Input() selectedHero;
    @Output() selectEvnt = new EventEmitter();
    @Output() deleteEvnt = new EventEmitter();
    deleteLoader = false;
    selected = -1;
    debug = false;

    constructor(private store: Store<any>) {
      this.store.select('deleteSpinner').subscribe( ( bool ) => {
        if (this.debug) {
          console.log('HeroListComponent.component: constructor: bool: ', bool);
        }
        this.deleteLoader = bool;
      })
    }

    delete($event: any, hero: Hero, idx: number) {
        $event.stopPropagation();
        this.selected = idx;
        this.store.dispatch(HeroActions.deleteSpinner({bool:true}));
        this.deleteEvnt.emit(hero);
    }

}
