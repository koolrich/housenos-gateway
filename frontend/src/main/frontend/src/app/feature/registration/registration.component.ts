import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import { Settings } from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import { emailValidator, matchingPasswords } from '../shared/util/validators';

import { ReferenceDataService } from '../referencedata/referencedata.service';
import { MatRadioChange } from '@angular/material';


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
  isMobile = false;
  states: string[];

  constructor(private appSettings: AppSettings, private fb: FormBuilder, 
    private referenceDataService: ReferenceDataService, breakpointObserver: BreakpointObserver) {
    this.settings = this.appSettings.settings;
    this.createForm();

    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches){
        console.log('Detected mobile breakpoint!');
        this.isMobile = true;
      }else{
        this.isMobile = false;
      }
    })
  }

  ngOnInit() {
    this.roles = this.referenceDataService.getRoles();
    this.states = this.referenceDataService.getStates();
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
      'address': ['', Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required],
      'userRole': 'User',
      'agreeTerms': false,
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  changeRole(event: MatRadioChange): void {
    console.log(event.value);
    if (event.value === this.roles[0]) {
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
    this.form.get('address').clearValidators();
    this.form.get('city').clearValidators();
    this.form.get('state').clearValidators();

    this.updateFormValidity();
  }

  addAgentFields() {
    this.form.get('businessName').setValidators([Validators.required]);
    this.form.get('address').setValidators([Validators.required]);
    this.form.get('city').setValidators([Validators.required]);
    this.form.get('state').setValidators([Validators.required]);

    this.updateFormValidity();
  }

  updateFormValidity() {
    this.form.get('businessName').updateValueAndValidity();
    this.form.get('address').updateValueAndValidity();
    this.form.get('city').updateValueAndValidity();
    this.form.get('state').updateValueAndValidity();
  }
}
