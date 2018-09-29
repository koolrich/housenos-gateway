import { Component, Output, EventEmitter, Input, OnInit, OnChanges, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, FormArray,Validators,ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatRadioChange } from '@angular/material';
import { DatePipe,CommonModule} from '@angular/common';
import { Subscription }   from 'rxjs';
import * as moment from 'moment';
import { AddPropertyComponent } from '../add-property.component';
import { FORM_DATA } from '../../form-data';
import { PropertyFeatureComponent } from '../../property-feature/property-feature.component';
import { Picture } from '../../../../../shared/models/picture.model';
import { PictureService } from '../../../../../shared/services/picture.service';
import { PropertyDetail } from '../../../../../shared/models/propertyDetail.model';
import { SharedModule }  from '../../../../../shared/shared.module';
import { Constants} from '../../../../../shared/util/constants';
@Component({
    selector: 'step-two-component',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.scss'],
    encapsulation: ViewEncapsulation.None, //allow border in mat components
    
})
export class StepTwoComponent implements OnInit,OnChanges {    
    public frmStepTwo: FormGroup;
    featureForm:FormGroup;
    formOptions: Array<any> = FORM_DATA;
    features: any [];
    bedroomFeatures: any=[];
    tenureUnits: any=[];
    maxOccupancyList: any=[];
    /*form Controls*/
    roomType: FormControl;
    tenure:FormGroup;
    feature:FormGroup;
    subscription: Subscription;
    initialFormValues: PropertyDetail;
    defaultRoomType:string;
    defaultTenureUnit:string;
    defaultSelectedFeatures:any;/* Output from frmStepThree*/
    events: string[] = [];
    ispublishNow:boolean=true;
    DefaultpublishDate = moment().format(Constants.DATE_FMT);
    time:string;
    //test control value
    form:FormGroup;
    counterValue = 3;
    minValue = 0;
    maxValue = 12;
    
    //end test control value
    constructor(private fb: FormBuilder,public pictureService:PictureService)  {
      let name:string; 
     
    }

    ngOnInit() {
      //Set default room type 
      this.defaultRoomType="Standard";
      this.defaultTenureUnit="Monthly";

      this.defaultSelectedFeatures={bedroom: ["Wardrobe", "Mirror"], bathroom: ["wc", "Shower"], kitchen: [], lounge: ['TV Cable']};
    

    if (!this.initialFormValues){
        this.createForm();
        this.featureForm.patchValue( this.defaultSelectedFeatures);
        this.featureForm.setControl('extra', this.fb.array([ this.initExtra('Generator')]));
    } 
      else{
        // patch input
      }
     
      //retrieve form meta data
      for (var i = 0, len = this.formOptions.length; i < len; i++) {
          if (this.formOptions[i].name=='tenure'){
            this.tenureUnits=this.formOptions[i].options;
      
          }
          if (this.formOptions[i].name=='occupancy'){
              this.maxOccupancyList=this.formOptions[i].options;
   
          }
          if (this.formOptions[i].controlType =='featureGroup') {
              this.features=this.formOptions[i].list;
              
              break;
          }

          
      }
    
    
  }
    ngOnChanges(){
     
      console.log('frmStepTwo Value',this.frmStepTwo.value)
    }
   
    createForm(){
      const numberPattern=Constants.numberPatern;
      // feature form
      this.featureForm= this.fb.group ({
        bedroom: [''],
        bathroom: '',
        kitchen: [''],
        lounge: [''],
        extra: this.fb.array([])
      });


      this.frmStepTwo= this.fb.group({
                      roomType: this.fb.control('',[Validators.required]),
                      occupancy: this.fb.control[''],
                      tenure: this.fb.group ({
                                  unit: ['',[Validators.required, Validators.minLength(2)]],
                                  lenght: ['1',[Validators.required, Validators.pattern(numberPattern)]]
                                  }),
                      price: this.fb.control('9000',[Validators.required, Validators.minLength(1)]),
                      description: this.fb.control("Testing", [
                                          Validators.required,
                                          Validators.minLength(4),
                                          Validators.maxLength(280)
                                        ]),
                      features:  this.featureForm,
                      publishDate:this.fb.control(moment().format(Constants.DATE_FMT),[Validators.required])
      });
  }
  

  private saveFeature(feature) {
    console.log('step two 2',feature.value);
    
   }
   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.events.push(`${type}: ${event.value}`);
    
  }
 
  radioChange($event: MatRadioChange) {
    if ($event.value === ' ') {
       this.ispublishNow =false;
    }else
    {this.ispublishNow =true;}
  }
  

 
   ngOnDestroy() {
    // prevent memory leak when component destroyed
   // this.subscription.unsubscribe();
  }

  public findInvalidControls() {
      const invalid = [];
      const controls = this.frmStepTwo.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      console.log(invalid);
      return invalid;
  }

  addextra(name) {
    this.extras.push(this.initExtra(name));
  }

  initExtra(name) {
    return this.fb.group({
        name: [name]
    });
  }
 
  get extras(): FormArray { 
    return this.featureForm.get('extra') as FormArray; 
  }

  
}

