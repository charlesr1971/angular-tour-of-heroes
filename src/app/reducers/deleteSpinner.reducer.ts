import { createReducer, on } from '@ngrx/store';
import {HeroActions} from '../actions';
import { deleteSpinner } from '../actions/hero';

export const initialState = false;

const debug = false;

const deleteSpinnereducer = createReducer(
  initialState,
  on(deleteSpinner, ( state, action ) => {
    if (debug) {
      console.log('deleteSpinner.reducer: deleteSpinnereducer: state ', state, ' action:', action);
    }
    return action.bool;
  })
);

export function deleteSpinnerReducer( state, action ): any {
  if (debug) {
    console.log('deleteSpinner.reducer: deleteSpinnerReducer: state ', state, ' action:', action);
  }
  return deleteSpinnereducer(state, action);
}
