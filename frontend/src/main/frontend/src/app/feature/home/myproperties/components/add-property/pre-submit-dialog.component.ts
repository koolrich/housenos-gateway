import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <h1 mat-dialog-title>Confirm Details</h1>
      <mat-dialog-content>
    
     
      <img  [src]="this.data.pictureUrl|safe" />   
        <mat-form-field>
          <input matInput formControlName="propertyName" placeholder="Enter picture caption">
        </mat-form-field>
        <mat-form-field>
        <input matInput formControlName="roomType" placeholder="Enter picture caption">
      </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="button" (click)="dialogRef.close()">Close</button>
      </mat-dialog-actions>
    </form>
  `
})
export class PreSubmitDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<PreSubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    console.log('dialog com',this.data)
    this.form = this._fb.group({
      propertyName: {value:this.data ? this.data.propertyName: '', disabled: true},
      roomType:this.data ? this.data.roomType: '',
      pictureUrl:this.data?this.data.pictureUrl:''
    })
    this.form.disable();
  }
  submit(form) {
    console.log('dialog submit',form.value)
    this.dialogRef.close(`${form.value.propertyName}`);
  }
}