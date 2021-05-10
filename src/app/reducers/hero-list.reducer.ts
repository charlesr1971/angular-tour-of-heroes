import { createReducer, on } from '@ngrx/store';
import {Hero} from '../models';
import {HeroActions} from '../actions';

export type HeroListState = Hero[];

const initialState: HeroListState = [];

const debug = false;

const loadHeroesreducer = createReducer(
  initialState,
  on(HeroActions.loadHeroesSuccess, ( state, action ) => {
    if (debug) {
      console.log('hero-list.reducer: loadHeroesreducer: state ', state, ' action:', action);
    }
    return action.payload;
  })
);

export function loadHeroesReducer( state, action ): any {
  if (debug) {
    console.log('hero-list.reducer: loadHeroesReducer: state ', state, ' action:', action);
  }
  return loadHeroesreducer(state, action);
}
