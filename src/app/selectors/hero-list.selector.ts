import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromHeroList from '../reducers/hero-list.reducer';

export const selectHeroListState = createFeatureSelector<fromHeroList.HeroListState>('selectHeroList');

export const createHeroList = createSelector(
  selectHeroListState,
  fromHeroList.loadHeroesReducer
);
