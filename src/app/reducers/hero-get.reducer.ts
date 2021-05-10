import { createReducer, on } from '@ngrx/store';
import {Hero} from '../models';
import {HeroActions} from '../actions';

export type HeroState = Hero;

const initialState: HeroState = {
    id: 0,
    name: ''
};

const debug = false;

const getHeroreducer = createReducer(
  initialState,
  on(HeroActions.getHeroSuccess, ( state, action ) => {
    if (debug) {
      console.log('hero-get.reducer: getHeroreducer: state ', state, ' action:', action);
    }
    return action.payload;
  })
);

export function getHeroReducer( state, action ): any {
  if (debug) {
    console.log('hero-get.reducer: getHeroReducer: state ', state, ' action:', action);
  }
  return getHeroreducer(state, action);
}
