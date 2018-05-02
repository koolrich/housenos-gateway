import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material/material.module';
import { RegistrationComponent} from './registration.component';

export const routes = [
  { path: '', component: RegistrationComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
