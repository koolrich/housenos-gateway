import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LandingComponent } from './feature/landing/landing.component';
import { HomeComponent} from './feature/home/home.component';

export const routes: Routes = [
  {path : '', component : LandingComponent},
  {path: 'login', loadChildren: 'app/feature/login/login.module#LoginModule'},
  {path: 'register', loadChildren: 'app/feature/registration/registration.module#RegistrationModule'},
  {
    path: '',
    component: HomeComponent, children: [
      { path: 'dashboard', loadChildren: 'app/feature/home/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } }
    ]
  },

  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
  // useHash: true
});
