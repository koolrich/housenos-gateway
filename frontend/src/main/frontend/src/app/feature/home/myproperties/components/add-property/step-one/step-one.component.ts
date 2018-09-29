import { Component, Output, EventEmitter, Input,ViewEncapsulation,OnInit,OnChanges, SimpleChange} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,FormArray, Validators } from '@angular/forms';
import { AddPropertyComponent } from '../add-property.component';
import { Address } from '../../../../../shared/models/address.model';
import { PropertyGroup } from '../../../../../shared/models/propertyGroup.model';
import { FORM_DATA } from '../../form-data';
import {AddressComponent} from '../../../../../shared/components/address/address.component';
import { Constants} from '../../../../../shared/util/constants'
import { Subject } from 'rxjs';
import { AppValidators} from '../../../../../shared/validators/app-validator';
@Component({
    selector: 'step-one-component',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StepOneComponent implements OnInit, OnChanges {    
    frmStepOne: FormGroup;
    isEditing:boolean=false;
    propertyGroup:PropertyGroup;
    _propertyGroupSub = new Subject();
    public formOptions: Array<any> = FORM_DATA;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
       //let propertyGroupModel: propertyGroup;
     
       const propertyGroupModel: PropertyGroup= 
            {
            id: '1',
            userId:'John',
            name: 'Whirlwind',
            title:'3 Bedroom',
            type:'Flat',
            numberofFloor:'1',
            address: { address1: '123 Main Street',address2:'Opposite NEPA', city: 'Owerri',state: 'Imo'},
            createdOn:"12/08/2017",
            updatedOn: "12/08/2017"
                
            
            }
        //Create propertyGroup form
        this.createForm();

        //Patch form
        if(propertyGroupModel){
            this.isEditing=true;
             
            //this.patchForm(propertyGroupModel);
            this.frmStepOne.patchValue({propertyName: propertyGroupModel.name,
                propertyTitle: propertyGroupModel.title,
                propertyType: propertyGroupModel.type,
                numberofFloor:propertyGroupModel.numberofFloor,
                address:propertyGroupModel.address})
                
        }
        
    }
  
    ngOnChanges(changes: { [propName: string]: SimpleChange }) {}
        

    createForm(){
        const numberPattern=Constants.numberPatern;
        this.frmStepOne= this.fb.group({
            propertyName: ['',Validators.required,[AppValidators.uniqueName]],
            propertyTitle: ['',[Validators.required, AppValidators.minLength(2),AppValidators.maxLength(10)]],
            propertyType: ['',[Validators.required]],
            numberofFloor:['',[Validators.pattern(numberPattern)]],
            address:this.fb.group({

                address1: ['',[Validators.required, Validators.minLength(2)]],
                address2: [''],
                state: this.fb.control('',[Validators.required, Validators.minLength(2)]),
                city: this.fb.control('',[Validators.required, Validators.minLength(2)])
                 })
                });
    }

   
   
    get addresses():FormArray {
        return (<FormArray>this.frmStepOne.get('address'));
    }


    public onSubmit(propertyGroupModel){
        console.log(propertyGroupModel);
        AppValidators.validateAllFormFields(this.frmStepOne);
        if( this.frmStepOne.valid ) {
            console.log('form is valid');
            if( this.isEditing === false ) {
               this. _propertyGroupSub.next(this.frmStepOne.value);
               // this.propertyGroup= this.prepareSavePropertyGroup();

              //this.store.dispatch(new SaveTripAction(this.tripForm.value));
            } else {
              //this.store.dispatch(new UpdateTripAction(this.tripForm.value));
             // this.redirectUponUpdate();
            }
          } else {
           // console.log('form is invalid ', this.tripForm);
          }
    }
   /* 
    export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({}as AbstractControl);
            if (validator && validator.required) {
                return true;
            }
        }
        if (abstractControl['controls']) {
            for (const controlName in abstractControl['controls']) {
                if (abstractControl['controls'][controlName]) {
                    if (hasRequiredField(abstractControl['controls'][controlName])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
  
    */
       
}

    
    /*

    prepareSavePropertyGroup():PropertyGroup {
        const propertyGroupFormModel = this.frmStepOne.value;
        const addressDeepCopy: Address[] = propertyGroupFormModel.address.map(
          (address: Address) => Object.assign({}, address)
        );
        const prepareSavePropertyGroup: any = {
          id: +this.propertyGroup.id,
          userId:'',
          name:this.propertyGroupFormModel.name,
          title:this.propertyGroupFormModel.title,
          type:this.propertyGroupFormModel.type,
          address: addressDeepCopy,
          createdOn:this.propertyGroupFormModel.createdOn,
          updatedOn:Date.now
        };
        return saveHero;
    }
    */


