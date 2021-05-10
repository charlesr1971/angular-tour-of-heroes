import {Action} from '@ngrx/store';

import {Hero} from '../models';
import {HeroActions} from '../actions';
import { createReducer, on } from '@ngrx/store';

export type HeroState = Hero;

const initialState: HeroState = {
    id: 0,
    name: ''
};

const debug = false;

export default createReducer(
  initialState,
  on(HeroActions.resetBlankHero, ( state, action ) => {
    if (debug) {
      console.log('hero-blank: blankHeroreducer: state ', state, ' action:', action);
    }
    return initialState;
  }),
  on(HeroActions.getHeroSuccess, ( state, action ) => {
    if (debug) {
      console.log('hero-get: getHeroreducer: state ', state, ' action:', action);
    }
    return action.payload;
  }),
);
