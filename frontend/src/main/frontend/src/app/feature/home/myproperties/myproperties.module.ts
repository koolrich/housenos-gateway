import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import { MaterialModule } from '../../../material/material.module';
import { MyPropertiesComponent } from './myproperties.component';


export const routes = [
  { path: '', component: MyPropertiesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    MaterialModule
  ],
  declarations: [
    MyPropertiesComponent
  ]
})


export class MypropertiesModule {}
