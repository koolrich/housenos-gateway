import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LandingComponent } from './feature/landing/landing.component';

export const routes: Routes = [
  {path : '', component : LandingComponent},
  {path: 'login', loadChildren: 'app/feature/login/login.module#LoginModule'},
  {path: 'register', loadChildren: 'app/feature/registration/registration.module#RegistrationModule'}
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
  // useHash: true
});
