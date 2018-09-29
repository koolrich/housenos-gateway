import { NgModule,ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { MyPropertiesComponent } from './myproperties.component';
import { PropertyTableComponent } from './components/property-table/property-table.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { PropertyResolver } from './propertyResolver';
import { StepOneComponent } from './components/add-property/step-one/step-one.component';
import { StepTwoComponent } from  './components/add-property/step-two/step-two.component';
import { StepThreeComponent } from './components/add-property/step-three/step-three.component';
import { StepFourComponent } from './components/add-property/step-four.component';
import { PropertyFeatureComponent } from './components/property-feature/property-feature.component';
import { AddressComponent } from '../../shared/components/address/address.component';
import { SafePipe } from '../../../feature/shared/services/safePipe.transform';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { ListUploadPictureComponent } from './components/upload-picture/list-upload-picture/list-upload-picture.component';
import { PictureFormComponent } from './components/add-property/step-three/picture-form/picture-form.component';
import { createCounterRangeValidator } from './components/add-property/counter-input.component';
import { CounterInputComponent } from './components/add-property/counter-input.component';

import { UnderlineDirective } from '../../../feature/shared/components/custom/underline.directive';
import { DateInput } from '../../../feature/shared/components/custom/dateInput.component';
import { CaptionDialogComponent } from './components/add-property/step-three/caption-dialog.component';
import { PreSubmitDialogComponent } from './components/add-property/pre-submit-dialog.component';
import { ShowErrorsComponent } from '../../shared/validators/show-errors.component';
import { SharedModule } from '../../../feature/shared/shared.module';

export const routes = [
  { path: '', component: MyPropertiesComponent, pathMatch: 'full' ,resolve: { property: PropertyResolver}},
  { path: 'create', component: AddPropertyComponent, pathMatch: 'full' ,data: { breadcrumb: 'Create New Property' }}
  

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule 
  ],
  declarations: [
    MyPropertiesComponent,
    PropertyTableComponent,
    AddPropertyComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    PropertyFeatureComponent,
    AddressComponent,
    SafePipe,
    UploadPictureComponent,
    ListUploadPictureComponent,
    PictureFormComponent ,
    CounterInputComponent,
    UnderlineDirective,
    DateInput,
    ShowErrorsComponent,
    CaptionDialogComponent,
    PreSubmitDialogComponent
    

  ],
  entryComponents: [CaptionDialogComponent,PreSubmitDialogComponent ],
  providers: [PropertyResolver]
    
 
  
})


export class MyPropertiesModule {}
  
  

