import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MAT_LABEL_GLOBAL_OPTIONS} from "@angular/material";
import { FormsModule, ReactiveFormsModule,ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

import { MaterialModule } from './material/material.module';
import { routing} from './app.routing';
import 'hammerjs';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature/shared/components/header/header.component';
import { AppSettings } from './app.settings';
import { LandingComponent } from './feature/landing/landing.component';
import { HomeComponent } from './feature/home/home.component';
import { HorizontalMenuComponent } from './feature/home/menu/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './feature/home/menu/vertical-menu/vertical-menu.component';
import { UserMenuComponent } from './feature/home/menu/user-menu/user-menu.component';
import { FullScreenComponent } from './feature/home/menu/fullscreen/fullscreen.component';
import { SidenavComponent } from './feature/home/menu/sidenav/sidenav.component';
import { BreadcrumbComponent } from './feature/home/menu/breadcrumb/breadcrumb.component';
import { PropertySearchComponent } from './feature/home/propertysearch/propertysearch.component';
import { ViewingsComponent } from './feature/home/viewings/viewings.component';

import { SharedModule } from './feature/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    HomeComponent,
    HorizontalMenuComponent,
    VerticalMenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    SidenavComponent,
    BreadcrumbComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    routing,
    SharedModule.forRoot() //load shared services
  ],
  providers: [
    AppSettings,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}} //remove floating placeholder after input
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
