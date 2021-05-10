import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {HeroesComponent} from './heroes.component';
import {HeroListComponent} from './hero-list.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroFormComponent} from './hero-form.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [HeroesComponent, HeroListComponent, HeroDetailComponent, HeroFormComponent],
  exports: [HeroesComponent, HeroDetailComponent],
  providers: []
})
export class HeroesModule {}
