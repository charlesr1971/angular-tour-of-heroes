import { createReducer, on } from '@ngrx/store';
import {HeroActions} from '../actions';
import { loadSpinner } from '../actions/hero';

export const initialState = false;

const debug = false;

const loadSpinnereducer = createReducer(
  initialState,
  on(loadSpinner, ( state, action ) => {
    if (debug) {
      console.log('loadSpinner.reducer: loadSpinnereducer: state ', state, ' action:', action);
    }
    return action.bool;
  })
);

export function loadSpinnerReducer( state, action ): any {
  if (debug) {
    console.log('loadSpinner.reducer: loadSpinnerReducer: state ', state, ' action:', action);
  }
  return loadSpinnereducer(state, action);
}
