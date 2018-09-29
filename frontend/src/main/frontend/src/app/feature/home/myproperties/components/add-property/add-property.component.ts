
import { Component,OnInit ,AfterViewInit, ViewChild, Input,ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Subscription }   from 'rxjs';
import { ISubscription }   from 'rxjs/Subscription';
//import { Property } from '../../../../shared/models/property/property.model';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { Address } from '../../../../shared/models/address.model';
import { Property }  from '../../../../shared/models/property.model';
import { PropertyService } from '../../../../shared/services/myproperties.service';
import { MatDialog, MatDialogRef} from '@angular/material';
import { PreSubmitDialogComponent } from './pre-submit-dialog.component';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

export class AddPropertyComponent implements OnInit,AfterViewInit {
    private isLinear:boolean=true;
    subscription: Subscription ;
    @ViewChild('StepOneComponent') stepOneComponent: StepOneComponent;
    @ViewChild('StepTwoComponent') stepTwoComponent: StepTwoComponent;
    @ViewChild('StepThreeComponent') stepThreeComponent: StepThreeComponent;
    formSubmitted = false;
    actionButton:string;
    action:string;
    property:Property;
    propertyForm:FormGroup;
    preSubmitDialogRef: MatDialogRef<PreSubmitDialogComponent>;
    constructor(private _fb: FormBuilder,
                private propertyService: PropertyService,
                private dialog: MatDialog,
                private cdRef: ChangeDetectorRef) { }

    ngOnInit()  {
     // const subscription = new Subscription();
       this.subscription = this.propertyService.on('submitForm').subscribe(()=> this.onSubmit());
      const subscription2 = this.propertyService.on('preSubmitForm').subscribe(()=> this.openPreSubmitDialog(this.propertyForm));
      //add to subscription
     // this.subscription.add(subscription);
     //this.subscription.add(subscription1);
      this.subscription.add(subscription2);
      
      /*TODO: retrieve the data and fill the form* with it
      this.PropertyService.getProperty().subscribe(data => {
        this.frmStepTwo.patchValue(data);
       
      },error);
     */
   

    }
    ngAfterViewInit(){
      this.propertyForm=this._fb.group({
        propertyGroup:this.frmStepOne,
        propertyDetail:this.frmStepTwo,
        picture:this.frmStepThree
    })
    }
    ngAfterViewChecked() {
      //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
      this.cdRef.detectChanges();
      }
    prepareSave(data){
      console.log('add propery->prepareSave',data)

    }
    //append form values to formdata
    onSubmit(): void {
      let formData = new FormData();
      this.formSubmitted = true;
     console.log('property Form',this.propertyForm.value)
      
      if(this.frmStepOne.valid && this.frmStepTwo.valid) {
          this.appendFormdata(formData,this.frmStepOne.value,'propertyGroup');
          this.appendFormdata(formData,this.frmStepTwo.value,'propertyDetails');
          // append pictures
          if(this.frmStepThree.value.pictures.length > 0){
            for (let i = 0;  i <this.frmStepThree.value.pictures.length; i++) {
                this.appendFormdata(formData, this.frmStepThree.value.pictures[i].file,'files');
               
            }
          }
          //TODO: post to api
          this.resetForm();
      } else {
        this.formSubmitted = false;
      }
       
     
    }
    // Append form object to formdata
    appendFormdata(FormData, data, name){
      name = name || '';
      if (typeof data === 'object'){
        
          for(let key in data){ 
              if (name == ''){
                  this.appendFormdata(FormData, data[key],key);
              } else {
                
                  this.appendFormdata(FormData, data[key], name + '['+key+']');
              }
          }
      } else {
        //  console.log('Incremental FormData Result'+ name + ' : ' + data);
          FormData.append(name, data);
         // console.log('Picture Results', FormData.getAll('files[name]'));
         
      }
      
  }
    resetForm() { 
      this.stepOneComponent.frmStepOne.reset();
      this.stepTwoComponent.frmStepTwo.reset();
      this.stepThreeComponent.reset();
     
    } 
    
    openPreSubmitDialog(propertyForm) {
      console.log('openPreSubmitDialog',propertyForm.value);
      const myCaption=this.propertyForm.value.propertyGroup.propertyName;
      const roomType=this.propertyForm.value.propertyDetail.roomType;
      const picture=this.propertyForm.value.picture.pictures[0].url;
      console.log('openPreSubmit url',picture);
      this.preSubmitDialogRef = this.dialog.open(PreSubmitDialogComponent, {
        data: {
          propertyName: myCaption ? myCaption : '',
          roomType:  roomType ? roomType:'',
          pictureUrl: picture? picture:''
        }
      });

      // take action after dialog is closed
      this.preSubmitDialogRef.afterClosed()
      .subscribe(newCaption=> {
          
          if (newCaption) {
            this.propertyForm.value.propertyGroup.propertyName=newCaption;
          }else {}
          
      });
  
  
  }

    // getters
    get frmStepOne() {
      
      return this.stepOneComponent ? this.stepOneComponent.frmStepOne : null;
   }

   get frmStepTwo() {
      return this.stepTwoComponent ? this.stepTwoComponent.frmStepTwo : null;
   }

   get frmStepThree() {
      return this.stepThreeComponent ? this.stepThreeComponent.frmStepThree : null;
   }
    ngOnDestroy() {
      this.subscription.unsubscribe();
      }

    prepareSaveProperty(): any {
      const propertyGroupModel = this.frmStepOne.value;
      //const formModel = this.frmStepThree.value;
    
      // deep copy of form model lairs
      const propertyGroupModelDeepCopy: Address = propertyGroupModel.addresss.map(
        (address: Address) => Object.assign({}, address)
      );
    
      // return new `Hero` object containing a combination of original hero value(s)
      // and deep copies of changed form model values
      const saveProperty: Property  = {
        id: this.property.id,
        name: propertyGroupModel.propertyName as string,
        type:propertyGroupModel.type,
        title:propertyGroupModel.title,
        status:propertyGroupModel.status,
        userId:"username",
        createdOn:"",
        updatedOn:"",
        // addresses: formModel.secretLairs // <-- bad!
        address: propertyGroupModelDeepCopy
      };
        return saveProperty;
    }
    
    
    
    editForm(items, index) {   
    
        this.actionButton = 'Edit';
    
        this.action = 'update';
    
        this.frmStepOne.setValue({
    
          name: items.name,
    
          address: {
    
            city: items.address.city,
    
            country: items.address.country
    
          }
 
         });
   
    }
    //get Property data
    /*
    this.CartdataService.get_Product_Path(pName)
    .subscribe(
        data => {
            this.bigImages = data['0'];
            this.smallImages = data['1'];
            this.spImages = data['2'];
         },
         error => { // here you handle errors },
         () => {
               // here you do something else
                });

      */
     
}


