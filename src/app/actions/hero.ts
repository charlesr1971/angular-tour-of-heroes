import { Injectable } from '@angular/core';
import { Action, createAction, props } from '@ngrx/store';

import { Hero } from '../models';

export const LOAD_HEROES = '[Hero] Load Heroes';
export const LOAD_HEROES_SUCCESS = '[Hero] Load Heroes Success';
export const GET_HERO = '[Hero] Get Hero';
export const GET_HERO_SUCCESS = '[Hero] Get Hero Success';
export const RESET_BLANK_HERO = '[Hero] Reset Blank Hero';
export const SAVE_HERO = '[Hero] Save Hero';
export const SAVE_HERO_SUCCESS = '[Hero] Save Hero Success';
export const ADD_HERO = '[Hero] Add Hero';
export const ADD_HERO_SUCCESS = '[Hero] Add Hero Success';
export const DELETE_HERO = '[Hero] Delete Hero';
export const DELETE_HERO_SUCCESS = '[Hero] Delete Hero Success';

export const loadSpinner = createAction(
  '[HeroForm Component] LoadSpinner',
  props<{ bool: boolean }>()
);

export const loadHeroes = createAction(
  LOAD_HEROES
);

export const loadHeroesSuccess = createAction(
  LOAD_HEROES_SUCCESS,
  (payload: Hero[]) => ({payload})
);

export const getHero = createAction(
  GET_HERO,
  (payload: any) => ({payload})
);

export const getHeroSuccess = createAction(
  GET_HERO_SUCCESS,
  (payload: Hero) => ({payload})
);

export const resetBlankHero = createAction(
  RESET_BLANK_HERO
);

export const saveHero = createAction(
  SAVE_HERO,
  (payload: Hero) => ({payload})
);

export const saveHeroSuccess = createAction(
  SAVE_HERO_SUCCESS,
  (payload: Hero) => ({payload})
);

export const addHero = createAction(
  ADD_HERO,
  (payload: Hero) => ({payload})
);

export const addHeroSuccess = createAction(
  ADD_HERO_SUCCESS,
  (payload: Hero) => ({payload})
);

export const deleteHero = createAction(
  DELETE_HERO,
  (payload: Hero) => ({payload})
);

export const deleteHeroSuccess = createAction(
  DELETE_HERO_SUCCESS,
  (payload: Hero) => ({payload})
);
