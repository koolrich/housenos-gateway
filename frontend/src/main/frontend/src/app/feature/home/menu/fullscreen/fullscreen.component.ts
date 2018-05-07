import {Component, ViewEncapsulation, ViewChild, HostListener, ElementRef} from '@angular/core';

@Component({
  selector: 'app-fullscreen',
  encapsulation: ViewEncapsulation.None,
  template: `
    <button mat-icon-button class="full-screen">
        <mat-icon *ngIf="!toggle" #expand>fullscreen</mat-icon>
        <mat-icon *ngIf="toggle" #compress>fullscreen_exit</mat-icon>
    </button> 
  `
})
export class FullScreenComponent {
  toggle:boolean = false;
  @ViewChild('expand') private expand: ElementRef;
  @ViewChild('compress') private compress: ElementRef;






}
