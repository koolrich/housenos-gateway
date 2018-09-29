// show-errors.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl ,FormGroup,FormControl} from '@angular/forms';

@Component({
 selector: 'show-errors',
 template: `
   <ul *ngIf="isShowErrors()">
     <li style="color: red" *ngFor="let error of listOfErrors()">{{error}}</li>
   </ul>
 `,
})
export class ShowErrorsComponent {

 private static readonly errorMessages = {
   'required': () => 'This field is required',
   'minLength': (params) => 'The min number of characters is ' + params,
   'maxLength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
   'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
   'years': (params) => params.message,
   'countryCity': (params) => params.message,
   'uniqueName': (params) => params.message,
   'telephoneNumbers': (params) => params.message,
   'telephoneNumber': (params) => params.message
 };

 @Input()
 private control: AbstractControlDirective | AbstractControl;

   isShowErrors(): boolean {
   return this.control &&
     this.control.errors &&
     (this.control.dirty || this.control.touched);
 }

 listOfErrors(): string[] {
   console.log('listerror',this.control.errors)
   return Object.keys(this.control.errors)
   
     .map(field => this.getMessage(field, this.control.errors[field]));
 }
 isFieldValid(field: string) {
 // return !this.form.get(field).valid && this.form.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}

 private getMessage(type: string, params: any) {
  console.log('show error field',type + ' '+ params);
   return ShowErrorsComponent.errorMessages[type](params);
 }

}