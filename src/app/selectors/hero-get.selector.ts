import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromHeroGet from '../reducers/hero-get.reducer';

export const selectHeroGetState = createFeatureSelector<fromHeroGet.HeroState>('selectHeroGet');

export const createHeroGet = createSelector(
  selectHeroGetState,
  fromHeroGet.getHeroReducer
);
