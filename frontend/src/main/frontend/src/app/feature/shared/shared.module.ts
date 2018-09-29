import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService} from './services/myproperties.service';
import { PictureService } from './services/picture.service';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
import { CurrencyMaskService} from './services/currency-mask.service';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MaterialModule } from '../../material/material.module';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    
  ],
  declarations: [CurrencyMaskDirective,DatePickerComponent,AutofocusDirective ],
  exports: [CurrencyMaskDirective,DatePickerComponent,AutofocusDirective ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PropertyService,
        PictureService,
        CurrencyMaskService
      ]
    };
  }
}

