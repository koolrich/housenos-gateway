import { Constants } from '../util/constants';
import { Pipe, PipeTransform,forwardRef, Directive,ElementRef, Renderer2,HostListener, Input,OnInit, AfterViewInit,   } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,NgControl } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateFormatDirective),
  multi: true
};

@Directive({
  selector: '[appDateFormatter]',

  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR] 
})



export class DateFormatDirective  implements PipeTransform, ControlValueAccessor  {
  private el: HTMLInputElement;
   // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void  = () => {};
    private onChangeCallback: (a: any) => void = () => {};
    constructor(private _renderer: Renderer2, private datePipe: DatePipe,private _elementRef: ElementRef) {
     
      this.el = this._elementRef.nativeElement;
    }
  transform(value: any, args?: any): any {
    return this.datePipe.transform(value, Constants.DATE_FMT);
  }



  ngOnInit() {
    this.el.value = this.transform(this.el.value);
  }

  writeValue(value: any){
    if(value){
        var date = new Date(value);
        this._renderer.setProperty(this._elementRef.nativeElement, 'valueAsDate', date);
    }
//and create a new date object if value is undefined
    else{
        this._renderer.setProperty(this._elementRef.nativeElement, 'valueAsDate', new Date());
    }
}
@HostListener('input', ['$event.target.valueAsDate']) input(value: any) {
  if(value){
      this.onChangeCallback(value);
      //this is where we will format the date string
  }else{
      this.onChangeCallback("");
  }
};
/*
  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.el.value = super.parse(value); // opossite of transform
  }
*/
registerOnChange(fn: any){
  this.onChangeCallback = fn;
}
registerOnTouched(fn: any){
  this.onTouchedCallback = fn;
}
  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.transform(value);
    console.log('date formatter: ',this.el.value )
    this.onTouchedCallback();
  }
}
