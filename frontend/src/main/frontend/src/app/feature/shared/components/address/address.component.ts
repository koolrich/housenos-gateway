import { Component, OnInit,Input,Output, Renderer2,ElementRef, ViewChild,OnChanges, SimpleChanges} from '@angular/core';
import { FormGroup , FormBuilder,FormArray, Validators, FormControl,ControlContainer} from '@angular/forms';
import { FORM_DATA } from '../../models/reference.data';

@Component({
  selector: ' address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  //@Input('group') public addressFormGroup: FormGroup;
  formOptions: Array<any> = FORM_DATA;
  @ViewChild('address2Btn') 
   address2Btn: ElementRef;
   states:Array<string>=[];
   addressFormGroup: FormGroup;
   showAddress2:boolean=false;
   addressLabel:string;

  constructor(private fb: FormBuilder,private renderer:Renderer2,elementRef: ElementRef,private controlContainer: ControlContainer) {
    
   }

  ngOnInit() {
    //Retrieve form meta data
    for (var i = 0, len = this.formOptions.length; i < len; i++) {
      if (this.formOptions[i].referenceType=='state'){
          this.states=this.formOptions[i].values;
          
          break;
      }

      
    }
    //Bind input property to formGroup
    this.addressFormGroup = <FormGroup>this.controlContainer.control;
     
    //Show address 2
    if (this.addressFormGroup.get('address2').value){
      this.showAddress2=true;
      this.addressLabel='Hide address 2'
    }else {
      this.addressLabel='Show address 2'

    }
    // Add listerner to address 2
     this.renderer.listen(this.address2Btn.nativeElement, 'click', () => {
        this.showAddress2=!this.showAddress2;
        if (!this.showAddress2){
         // this.addressFormGroup.controls['address2'].patchValue('');
         }
        this.addressLabel=this.showAddress2?'- Hide address 2':'+ Show address 2 line (Optional)';
        this.renderer.setProperty(this.address2Btn.nativeElement, 'innerHTML', this.addressLabel);
    });
    
    
  }


  

}
