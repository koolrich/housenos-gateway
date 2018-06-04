import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Settings } from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import { emailValidator, matchingPasswords } from '../shared/util/validators';

import { ReferenceDataService } from '../referencedata/referencedata.service';
import {MatRadioChange} from '@angular/material';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  settings: Settings;
  form: FormGroup;
  roles: string[];
  isAgent = false;

  constructor(private appSettings: AppSettings, private fb: FormBuilder, private referenceDataService: ReferenceDataService) {
    this.settings = this.appSettings.settings;
    this.createForm();
  }

  ngOnInit() {
    this.roles = this.referenceDataService.getRoles();
  }

  createForm() {
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'businessName': ['', Validators.required],
      'phone': [null],
      'userRole': 'User',
      'agreeTerms': false,
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  changeRole(event: MatRadioChange): void {
    console.log(event.value);
    if (event.value === this.roles[0]) {
      console.log('User');
      this.removeAgentFields();
      this.isAgent = false;
    } else {
      this.addAgentFields();
      this.isAgent = true;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => { this.settings.loadingSpinner = false; }, 300);
  }

  removeAgentFields() {
    this.form.get('businessName').clearValidators();
    this.form.get('businessName').updateValueAndValidity();
  }

  addAgentFields() {
    this.form.get('businessName').setValidators([Validators.required]);
  }


}
