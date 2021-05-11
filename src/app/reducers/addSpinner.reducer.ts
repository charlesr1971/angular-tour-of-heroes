import { createReducer, on } from '@ngrx/store';
import {HeroActions} from '../actions';
import { addSpinner } from '../actions/hero';

export const initialState = false;

const debug = false;

const addSpinnereducer = createReducer(
  initialState,
  on(addSpinner, ( state, action ) => {
    if (debug) {
      console.log('addSpinner.reducer: addSpinnereducer: state ', state, ' action:', action);
    }
    return action.bool;
  })
);

export function addSpinnerReducer( state, action ): any {
  if (debug) {
    console.log('addSpinner.reducer: addSpinnerReducer: state ', state, ' action:', action);
  }
  return addSpinnereducer(state, action);
}
