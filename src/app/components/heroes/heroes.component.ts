import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import { of } from 'rxjs';

import {AppState} from '../../reducers';
import {HeroActions} from '../../actions';
import {HeroListComponent} from './hero-list.component';
import {HeroDetailComponent} from './hero-detail.component';

@Component({
    selector: 'rx-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
    heroes: Observable<any>;
    prev = [];
    addingHero = false;
    selectedHero;
    debug = true;
    changeLog = [];

    constructor(
        private store: Store<any>,
        private router: Router
    ) {
        this.heroes = store.select('selectHeroList');
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close() {
        this.addingHero = false;
    }

    delete(hero) {
        this.store.dispatch(HeroActions.deleteHero(hero));
    }

    select(hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    }

    gotoDetail() {
        this.router.navigate(['/detail/', this.selectedHero.id]);
    }
}
