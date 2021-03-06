import reducer, * as fromHero from './hero';
import {HeroActions} from '../actions';

describe('Hero Reducer', () => {

  let actions: any;
  let state: fromHero.HeroState;

  beforeEach(() => {
    actions = HeroActions.loadHeroes();
    state = {
      id: 1,
      name: 'Test'
    };
  });

  it('uses an initial state when none is given', () => {
    let result = reducer(undefined, {type: 'SOME ACTION'});
    expect(result.id).toBe(0);
    expect(result.name).toBe('');
  });

});
