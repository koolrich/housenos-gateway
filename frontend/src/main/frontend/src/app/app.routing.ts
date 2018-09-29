import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LandingComponent } from './feature/landing/landing.component';
import { HomeComponent } from './feature/home/home.component';
//import { MyPropertiesModule } from './feature/home/myproperties/myproperties.module';

export const routes: Routes = [
  {path : '', component : LandingComponent},
  {path: 'login', loadChildren: 'app/feature/login/login.module#LoginModule'},
  {path: 'register', loadChildren: 'app/feature/registration/registration.module#RegistrationModule'},
  {path: '',
    component: HomeComponent, children: [
      { path: 'dashboard', loadChildren: 'app/feature/home/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
      { path: 'properties/manage', loadChildren: 'app/feature/home/myproperties/myproperties.module#MyPropertiesModule', data: { breadcrumb: 'My Properties' } },
      { path: 'properties/search', loadChildren: 'app/feature/home/propertysearch/propertysearch.module#PropertySearchModule', data: { breadcrumb: 'Property Search' } },
      { path: 'viewings', loadChildren: 'app/feature/home/viewings/viewings.module#ViewingsModule', data: { breadcrumb: 'Viewings' } },
    ]
  },

  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
  // useHash: true
  onSameUrlNavigation: 'reload' //enable reload or reset page
  
});
