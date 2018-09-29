
import { Component, forwardRef, Input, OnInit  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Constants} from '../../../shared/util/constants'
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {
  /**
   * Set the value of the date set by user, notice the underscore infront of the datevalue
   */

  @Input() _dateValue: string = null;

  /**
   * Placeholder value for the material control input
   */
  @Input() public placeholder: string = null;

  /**
   * The date format to use with default format but allowing you to pass a custom date format
   */
  @Input() private format = Constants.DATE_FMT;

  get dateValue() {
    return moment(this._dateValue, this.format);
  }

  set dateValue(val) {
    this._dateValue = moment(val).format(this.format);
    this.propagateChange(this._dateValue);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value, this.format);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.dateValue = moment(value, this.format);
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
