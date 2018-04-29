import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {
      path : '', component : LandingComponent
    }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
  // useHash: true
});
