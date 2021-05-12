import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

import {AppState} from '../../reducers';
import {HeroActions} from '../../actions';
import {Hero} from '../../models';

@Component({
    selector: 'rx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

    public heroes: any;
    debug = false;

    constructor(
        private store: Store<{ selectHeroList: any }>,
        private router: Router
    ) {
      this.heroes = this.store.select('selectHeroList');
    }

    ngOnInit(): void {
      this.store.subscribe( (data) => {
        if (this.debug) {
         console.log('DashboardComponent: ngOnInit: this.heroes.subscribe: data ', data);
        }
      });
    }

    ngOnChanges(changes: SimpleChanges) {
      // this.heroes = this.store.select('selectHeroList');
    }

    gotoDetail(hero: Hero) {
        this.router.navigate(['/detail/', hero.id]);
    }

}
