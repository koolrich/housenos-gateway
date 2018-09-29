import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPropertyComponent } from './add-property.component';


@Component({
    selector: 'step-four-component',
    templateUrl: './step-four.component.html',
})
export class StepFourComponent  {    
    frmStepFour: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        
    }

    ngOnInit() {
        
        this.frmStepFour = this.formBuilder.group({
            publishedOn: ['', Validators.required]
        });
        

    }


}

