import { Component, ViewChild,Output, ElementRef,EventEmitter,forwardRef, Input, OnInit, OnChanges, AfterViewInit} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,NgControl  } from '@angular/forms';
import {DatePipe} from '@angular/common';

export const DATE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInput),
    multi: true
  };
  
  @Component({
      template:`<mat-form-field>
      <input matInput [matDatepicker]="input" placeholder="Choose a date" (selectedChanged)="onChange($event)">
      <mat-datepicker-toggle matSuffix [for]="input"></mat-datepicker-toggle>
      <mat-datepicker #input></mat-datepicker>
    </mat-form-field>`,
      selector:"date-input",
      styles:[],
      providers:[DATE_VALUE_ACCESSOR, DatePipe]
  })

export class DateInput implements ControlValueAccessor{
    @ViewChild("inputdate")
    input:ElementRef;
    disabled=false;
    changeCallback=(data:any)=>{};
    touchCallback=()=>{};
    private onTouchedCallback: () => void  = () => {};
    private onChangeCallback: (a: any) => void = () => {};
    time:string;
    
    constructor(private datePipe: DatePipe) {
        
    }
    ngOnInit() {
        console.log('input date',this.input)
        this.time = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

        console.log('time date',this.time)
    }
    onChange(event){
        let timestamp=this.convertToTimestamp(event.target.value);
        this.onChangeCallback(timestamp);
        console.log('dateInput-timestamp',timestamp)
    }

    convertToTimestamp(formatedDate){
        //TODO:implement
        let timestamp = this.datePipe.transform(formatedDate, 'dd-MM-yyyy');
        this.onChangeCallback(timestamp);
    }

    convertFromTimestamp(timestamp){
        //TODO:implement
    }

    writeValue(obj: any){
        let formatedDate=this.convertFromTimestamp(obj);
        this.input.nativeElement.value=formatedDate;
    }

    registerOnChange(fn: any){
        console.log('change:dateInput-timestamp')
        this.onChangeCallback=fn;
    }

    registerOnTouched(fn: any){
        this.onTouchedCallback=fn;
    }

    setDisabledState(isDisabled: boolean){
        this.disabled=isDisabled;
    }

    resetValue() {
        let dp = new DatePipe(navigator.language);
        let p = 'dd-MM-yyyy';
        let dtr = dp.transform(new Date(), p );
       // this.frmsetValue({effectiveEndDate: dtr});
      }
      
      currentDate() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0,10);
      }
}