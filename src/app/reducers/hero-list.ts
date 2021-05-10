import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import { createReducer, on } from '@ngrx/store';

import {Hero} from '../models';
import {HeroActions} from '../actions';
import * as _ from 'lodash';

export type HeroListState = Hero[];

const initialState: HeroListState = [];

const debug = false;

export default createReducer(
  initialState,
  on(HeroActions.loadHeroesSuccess, ( state, action ) => {
    if (debug) {
      console.log('hero-list: loadHeroesreducer: state ', state, ' action:', action);
    }
    return action.payload;
  }),
  on(HeroActions.addHeroSuccess, ( state, action: any ) => {
    if (debug) {
      console.log('hero-add: addHeroreducer: state ', state, ' action:', action);
    }
    return [...state, action.payload];
  }),
  on(HeroActions.saveHeroSuccess, ( state, action ) => {
    if (debug) {
      console.log('hero-save: saveHeroreducer: state ', state, ' action:', action);
    }
    const index = _.findIndex(state, {id: action.payload.id});
    if (index >= 0) {
        return [
            ...state.slice(0, index),
            action.payload,
            ...state.slice(index + 1)
        ];
    }
    return state;
  }),
  on(HeroActions.deleteHeroSuccess, ( state, action: any ) => {
    if (debug) {
      console.log('hero-delete: deleteHeroreducer: state ', state, ' action:', action);
    }
    return state.filter(hero => {
      const id = parseInt(action.payload.id, 10);
      if (debug) {
        console.log('hero-delete: deleteHeroreducer: id: ', id);
      }
      return hero.id !== id;
    });
  }),
);
