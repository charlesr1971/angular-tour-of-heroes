import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MaterialModule } from '../../material.module';

import {DashboardComponent} from './dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: []
})
export class DashboardModule {}
