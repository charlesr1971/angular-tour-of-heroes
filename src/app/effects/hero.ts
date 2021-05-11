import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, catchError, switchMap } from 'rxjs/operators';
import { Effect, Actions, createEffect, ofType } from '@ngrx/effects';

import {AppState} from '../reducers';
import {HeroActions} from '../actions';
import {HeroService} from '../services/hero';
import {Store} from '@ngrx/store';

import { HttpService } from '../services/http.service';
import { HeroDetailComponent } from '../components/heroes/hero-detail.component';

@Injectable()
export class HeroEffects {
    debug = false;

    constructor(
        private update$: Actions,
        private svc: HeroService,
        private httpService: HttpService,
        private store: Store<any>,
    ) {}

    @Effect() loadHeroes$ = this.update$.pipe(
      ofType(HeroActions.LOAD_HEROES),
      switchMap(() => {
        if (this.debug) {
          console.log('HeroEffects: loadHeroes$: request');
        }
        return this.httpService.readHero();
      }),
      map((heroes) => {
        if (this.debug) {
          console.log('HeroEffects: loadHeroes$: response:  heroes: ', heroes);
        }
        return HeroActions.loadHeroesSuccess(heroes);
      }),
    );

    @Effect() getHero$ = this.update$.pipe(
        ofType(HeroActions.GET_HERO),
        map((action: any) => action.payload),
        switchMap((id: any) => {
          if (this.debug) {
            console.log('HeroEffects: getHero$: request: id: ', id);
          }
          return this.httpService.readHero(1, id);
        }),
        map((hero: any) => {
          if (this.debug) {
            console.log('HeroEffects: getHero$: response: hero: ', hero);
          }
          this.store.dispatch(HeroActions.loadHeroes());
          return HeroActions.getHeroSuccess(hero);
        }),
    );

    @Effect() saveHero$ = this.update$.pipe(
        ofType(HeroActions.SAVE_HERO),
        map((action: any) => action.payload),
        switchMap((hero: any) => {
          if (this.debug) {
            console.log('HeroEffects: saveHero$: request: hero: ', hero);
          }
          return this.httpService.createHero(hero);
        }),
        map((hero: any) => {
          if (this.debug) {
            console.log('HeroEffects: saveHero$: response: hero: ', hero);
          }
          this.store.dispatch(HeroActions.loadHeroes());
          return HeroActions.saveHeroSuccess(hero);
        }),
    );

    @Effect() addHero$ = this.update$.pipe(
      ofType(HeroActions.ADD_HERO),
      map((action: any) => action.payload),
      switchMap((hero: any) => {
        if (this.debug) {
          console.log('HeroEffects: addHero$: request: hero: ', hero);
        }
        return this.httpService.createHero(hero);
      }),
      map((hero: any) => {
        if (this.debug) {
          console.log('HeroEffects: addHero$: response: hero: ', hero);
        }
        this.store.dispatch(HeroActions.loadHeroes());
        this.store.dispatch(HeroActions.resetBlankHero());
        this.store.dispatch(HeroActions.loadSpinner({bool:false}));
        return HeroActions.addHeroSuccess(hero);
      }),
    );

    @Effect() deleteHero$ = this.update$.pipe(
      ofType(HeroActions.DELETE_HERO),
      map((action: any) => action.payload),
      switchMap((hero: any) => {
        if (this.debug) {
          console.log('HeroEffects: deleteHero$: request: hero: ', hero);
        }
        return this.httpService.deleteHero(hero);
      }),
      map((hero: any) => {
        if (this.debug) {
          console.log('HeroEffects: deleteHero$: response: hero: ', hero);
        }
        this.store.dispatch(HeroActions.loadHeroes());
        return HeroActions.deleteHeroSuccess(hero);
      }),
    );

}
