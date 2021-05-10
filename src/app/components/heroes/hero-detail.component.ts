import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription, Observable} from 'rxjs';

import {Hero} from '../../models';
import {AppState} from '../../reducers';
import {HeroActions} from '../../actions';
import {HeroFormComponent} from './hero-form.component';
import { of } from 'rxjs';

@Component({
    selector: 'rx-hero-detail',
    template: `
        <rx-hero-form
            [hero]="hero | async"
            (back)="goBack()"
            (save)="save($event)"
            [addingHero]="addingHero"
        ></rx-hero-form>
    `
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() addingHero = false;
    idSub: Subscription;
    hero: Observable<any>;
    navigated = false;
    debug = true;

    @Output() closeEvnt = new EventEmitter();

    constructor(
        private store: Store<{ selectHeroGet: any }>,
        private store1: Store<any>,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.hero = store.select('selectHeroGet');
    }

    ngOnInit() {
        this.idSub = this.route.params
        .subscribe(params => {
            const id = params.id;
            if (id) {
                this.store.dispatch(HeroActions.getHero(id));
                this.navigated = true;
            } else {
                this.store.dispatch(HeroActions.resetBlankHero());
                this.navigated = false;
            }
        });
        if (this.addingHero) {
          // if (this.debug) {
            console.log('HeroDetailComponent: save: this.addingHero ', this.addingHero);
          // }
          this.store1.dispatch(HeroActions.resetBlankHero());
          this.hero = of({
            id: 0,
            name: ''
          });
        }
    }

    ngOnDestroy() {
        this.idSub.unsubscribe();
    }

    goBack(savedHero: Hero = null) {
      if (savedHero) {
        this.closeEvnt.emit(savedHero);
        // if (this.navigated) { window.history.back(); }
        if (savedHero.id > 0) {
          this.router.navigate(['/detail/', savedHero.id]);
        }
      }
      else {
        window.history.back();
      }
    }

    save(hero) {
      if (this.debug) {
        console.log('HeroDetailComponent: save: hero ', hero, ' this.navigated: ', this.navigated);
      }
      if (hero.id === 0) {
          this.store.dispatch(HeroActions.addHero(hero));
          this.hero = of({
            id: 0,
            name: ''
          });
      } else {
          this.store.dispatch(HeroActions.saveHero(hero));
      }
      if (hero) {
        this.goBack(hero);
      }
    }
}
