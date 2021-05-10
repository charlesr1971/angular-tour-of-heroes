import '@ngrx/core/add/operator/select';
import {compose} from '@ngrx/core/compose';
import {combineReducers} from '@ngrx/store';

import heroListReducer, * as fromHeroList from './hero-list';
import heroReducer, * as fromHero from './hero';

export interface AppState {
    heroes: fromHeroList.HeroListState;
    hero: fromHero.HeroState;
}

export default compose(combineReducers)({
    heroes: heroListReducer,
    hero: heroReducer
});
