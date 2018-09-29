import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup,FormArray,FormControl,ControlContainer,Validators } from '@angular/forms';
//import { StepTwoComponent } from '../add-property/step-two.component';
import { FORM_DATA } from '../form-data';
import {MatSelectChange} from '@angular/material';


@Component({
    selector: 'property-feature',
    templateUrl: './property-feature.component.html',
    styleUrls: ['./property-feature.component.scss'],
})
export class PropertyFeatureComponent  implements OnChanges{    
    frmStepTwo: FormGroup;
    //frmFeature: FormGroup;
    featureForm:FormGroup;
    formOptions: Array<any> = FORM_DATA;
    defaultFeatures: any [];
    propertyFeature:FormGroup;
    

    isBedroomDisabled = false;
    isBathroomDisabled = false;
    isKitchenDisabled = false;
    isLoungeDisabled = false;
    //device: any = [];
    defaultValue  = [1,1];

   // @Input() inputFeatures: any[];
    //@Output() save : EventEmitter<any> =new EventEmitter();
    

    constructor(private fb: FormBuilder,private controlContainer: ControlContainer,private cdRef: ChangeDetectorRef) {}

    ngOnInit() {
      //Get default features
      for (var i = 0, len = this.formOptions.length; i < len; i++) {
       
        if (this.formOptions[i].controlType =='featureGroup') {
          this.defaultFeatures=this.formOptions[i].list;
          break;
        }  

      }
      // bind data to featureForm
      this.featureForm = <FormGroup>this.controlContainer.control;
      
      
    }
    initForm(){
      let features: FormGroup;
    
      //create property feature form
      this.featureForm=this.fb.group({
        features: this.fb.group({
                bedroom:this.fb.control([]),
                bathroom:this.fb.control([]),
                kitchen:this.fb.control([]),
                lounge:this.fb.control([]),
                extra:this.fb.array([])
              })
        })
  
    }
   
    //Enable/disable key feature list 
    onChange(value,featureName) {
    
      switch(featureName) { 
        case 'Bedroom': { 
         
          this.isBedroomDisabled = !this.isBedroomDisabled;
           if (value.checked === true) {}
           else {
            this.bedroom.patchValue([]);
           }
          break; 
        } 
        case 'Bathroom': { 
          this.isBathroomDisabled = !this.isBathroomDisabled;
           if (value.checked === true) {}
            else { 
              this.bathroom.patchValue([]);
            }
          break; 
        } 
        case 'Kitchen': { 
          this.isKitchenDisabled = !this.isKitchenDisabled;
          if (value.checked === true) {}
          else {
            this.kitchen.patchValue([]);
          }
          break; 
        } 
        case 'Lounge': { 
          this.isLoungeDisabled = !this.isLoungeDisabled;
          if (value.checked === true) {}
          else {
            this.lounge.patchValue([]);
          }
          break; 
        } 
        default: { 
            
           break; 
        } 
     } 

    
   }

  ngOnChanges (changes:SimpleChanges){
      
   // Track change in component. Called once before Init hook;
    console.log('key Features mode change',changes);
  }  
  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
    }

  //TODO: action to perform when an option is selected
  featureSelected(type,event){
    
    switch (type){
      case'bedroom': {
        
      if (event.option.selected){
          
      }else {
        
       //this.bedroom.removeAt(this.bedroom.value.findIndex(image => image.name === event.option.value))
      }
       
        break;
      }

    }
   
  }
  // intiatialise extras
  initExtras() {
    return this.fb.group({
      name: ''}
    );
  }

  addExtra(extra?:string):void {
    
    let name:String;
    //const extraFeatures=(<FormArray>(<FormGroup>this.featureForm.controls['features']).controls['extra']);
    if(extra){
      name=extra;
    }else {
      name='';
    }
    this.extras.push(
          this.initExtras())
    
   
  }
  // remove extra feature element
  removeExtraFeature(index){
    this.extras.removeAt(index);
  }

  //get features
  get keyFeatures(): FormArray {
    return this.featureForm.get('features') as FormArray;
  };
  get bedroom():FormArray{
    return this.featureForm.controls['bedroom'] as FormArray;
  }
  get bathroom():FormArray{
    return <FormArray>this.featureForm.controls['bathroom'];
 }
  get kitchen():FormArray{
    return <FormArray>this.featureForm.controls['kitchen'];
  }
  get lounge():FormArray{
    return <FormArray>this.featureForm.controls['lounge'];
  }
  get extras():FormArray{
    return this.featureForm.get('extra') as FormArray;
  }
 

}


