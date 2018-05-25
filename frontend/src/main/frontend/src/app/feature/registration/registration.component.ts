import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Settings } from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import { emailValidator, matchingPasswords } from '../shared/util/validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public settings: Settings;
  public form: FormGroup;

  constructor(public appSettings: AppSettings, public fb: FormBuilder) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'firstName': [null],
      'lastName': [null],
      'phone': [null],
      'address': [null],
      'city': [null],
      'state': [null],
      'userRole': [null],
      'agreeTerms': false,
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => { this.settings.loadingSpinner = false; }, 300);
  }

}
