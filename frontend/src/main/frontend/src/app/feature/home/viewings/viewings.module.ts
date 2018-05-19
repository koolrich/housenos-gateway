import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import { MaterialModule } from '../../../material/material.module';
import { ViewingsComponent } from './viewings.component';

export const routes = [
  { path: '', component: ViewingsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    MaterialModule
  ],
  declarations: [
    ViewingsComponent
  ]
})

export class ViewingsModule {}
