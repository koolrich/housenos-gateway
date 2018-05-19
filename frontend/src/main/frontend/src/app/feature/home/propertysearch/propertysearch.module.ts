import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import { MaterialModule } from '../../../material/material.module';
import { PropertySearchComponent} from './propertysearch.component';


export const routes = [
  { path: '', component: PropertySearchComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    MaterialModule
  ],
  declarations: [
    PropertySearchComponent
  ]
})
export class PropertySearchModule { }
