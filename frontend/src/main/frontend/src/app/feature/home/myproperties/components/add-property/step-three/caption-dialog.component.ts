import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <h1 mat-dialog-title>Add Caption</h1>
      <mat-dialog-content>
        <mat-form-field>
          <input matInput formControlName="caption" placeholder="Enter picture caption">
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="submit">Add</button>
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      </mat-dialog-actions>
    </form>
  `
})
export class CaptionDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<CaptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    console.log('dialog com',this.data.caption)
    this.form = this._fb.group({
      caption: this.data ? this.data.caption : ''
    })
  }
  submit(form) {
    console.log('dialog submit',form.value.caption)
    this.dialogRef.close(`${form.value.caption}`);
  }
}