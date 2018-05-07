import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public settings: Settings;
  public isLoggedIn = false;

  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
  }

}
