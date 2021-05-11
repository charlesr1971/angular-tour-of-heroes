import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpService } from './services/http.service';
import { UtilsService } from './services/utils.service';
import { routing } from './routes';

import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import reducer from './reducers';

import {DashboardModule, HeroesModule} from './components';
import {HeroService} from './services/hero';
import {HeroEffects} from './effects';

import heroListReducer, * as fromHeroList from './reducers/hero-list';

import { loadHeroesReducer } from './reducers/hero-list.reducer';
import { getHeroReducer } from './reducers/hero-get.reducer';

import { themeSwitcherReducer } from './app-state/reducers/themeSwitcher.reducer';
import { MyThemeSwitcherComponent } from './components/my-theme-switcher/my-theme-switcher.component';
import { modeSwitcherReducer } from './app-state/reducers/modeSwitcher.reducer';
import { MyModeSwitcherComponent } from './components/my-mode-switcher/my-mode-switcher.component';

import { addSpinnerReducer } from './reducers/addSpinner.reducer';
import { deleteSpinnerReducer } from './reducers/deleteSpinner.reducer';


@NgModule({
  declarations: [
    AppComponent,
    MyThemeSwitcherComponent,
    MyModeSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    routing,
    DashboardModule,
    HeroesModule,
    StoreModule.forRoot([reducer], {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false
      }
    }),
    StoreModule.forRoot({
      themeSwitch: themeSwitcherReducer,
      modeSwitch: modeSwitcherReducer,
      addSpinner: addSpinnerReducer,
      deleteSpinner: deleteSpinnerReducer,
    }),
    StoreModule.forFeature('selectHeroList', loadHeroesReducer),
    StoreModule.forFeature('selectHeroGet', getHeroReducer),
    EffectsModule.forRoot([HeroEffects]),
  ],
  exports: [],
  providers: [
    HttpService,
    UtilsService,
    HeroService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
