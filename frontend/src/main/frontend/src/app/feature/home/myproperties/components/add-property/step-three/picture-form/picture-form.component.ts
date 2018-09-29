import { Component, OnChanges, SimpleChange,OnInit,ElementRef,Input,Output, Renderer2,ViewChild ,ViewChildren,QueryList,EventEmitter,SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription }   from 'rxjs';
import {  map,tap,distinctUntilChanged,debounceTime  } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import { SafePipe } from '../../../../../../shared/services/safePipe.transform';
import { Picture } from '../../../../../../shared/models/picture.model';
import { StepThreeComponent } from '../../step-three/step-three.component';

//import { UploadPictureComponent } from '../upload-picture.component';
//import { PictureService } from '../../../../../shared/services/picture.service';



@Component({
  selector: 'picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.scss']
})
export class PictureFormComponent implements OnInit,OnChanges {
  pictureForm: FormGroup;
  isHideFileDescr:boolean=true;
  elementRef:ElementRef;
  public selectedFile:string;
  
  @Output()
  _removeFile = new EventEmitter<string>();
  @Input('count') count:number;
  @Input('pictureGroup') 
  set picture(picture:any){
    console.log('picture index',picture);
    
    this.pictureForm=this.fb.group({
      name: [picture.name],
      caption: [picture.caption],
      src:[picture.src],
      url:[picture.url]
      });
      
  }
 // private pictureGroup:FormGroup;

  constructor(private fb: FormBuilder,elementRef: ElementRef,private renderer: Renderer2) { 
    this.elementRef = elementRef;
    this.pictureForm=this.fb.group({
      name: [''],
      caption: [''],
      src:[''],
      url:['']
      });
      this.onChanges();
  }

  ngOnInit() {
    this.pictureForm.valueChanges.subscribe((changes) => { console.log('mytrack change',changes); }) 
  }
  ngOnChanges(changes: SimpleChanges){
    console.log('calling pictureform ngOnChanges:',this.pictureForm);
    
    //this.controls.valueChanges.subscribe(data=>{console.log("tapping searchItem",data);})

    this.pictureForm.valueChanges.subscribe((changes) => { console.log('mytrack change',changes); }) 
      for (let property in changes) {
          if (property === 'caption') {
            console.log('Previous:', changes[property].previousValue);
            console.log('Current:', changes[property].currentValue);
            console.log('firstChange:', changes[property].firstChange);
          } 
      }
  
  }
  onChanges(): void {
      console.log('On changes PictureForm');
    
      console.log("tapping searchItem");
      this.controls.valueChanges.subscribe(data=>{console.log("tapping searchItem",data);})
  

    
      this.pictureForm.valueChanges.pipe(
              debounceTime(2000),
              distinctUntilChanged(),
              tap((form) => {
                    console.log("tapping searchItem",form);
                    sessionStorage.setItem('form', JSON.stringify(form));
                    let formValues = sessionStorage.getItem('form');
                    if (formValues) {
                      //this.applyFormValues(this.listPictureForm, JSON.parse(formValues));
                    }
              })
          ).subscribe();

  }
  removeFile(index){
    this._removeFile.emit(index) ; 
  }
  toggleShowFileDescription(index){
    //get file caption DOM element
    console.log('toggle',event)
    const inputElem=this.elementRef.nativeElement.querySelector('#caption'+index);
    console.log('toggle control',inputElem);
    if(this.isHideFileDescr){
        this.renderer.addClass(inputElem, 'showDesc'); 
        this.isHideFileDescr=false; 
    }else {
        this.renderer.removeClass(inputElem ,'showDesc'); 
        this.isHideFileDescr=true; 
    }
    
    console.log('pictureForm',this.pictureForm.value)
  }

  handleFileClick (index,src) {
    const fileElem=this.elementRef.nativeElement.querySelector('#file'+index);
    console.log('form img',fileElem)
    const preSelectedElem=this.elementRef.nativeElement.querySelector('.selectedFile');
    
    if(preSelectedElem!==null){
        this.renderer.removeClass(preSelectedElem,'selectedFile');
        console.log('prev form img',preSelectedElem)
    }
    
    //set focus of selected file
  //  this.renderer.removeClass(preSelectedElem,'selectedFile');
    this.renderer.addClass(fileElem,'selectedFile');

    this.selectedFile=src;
    console.log('selected img src',this.selectedFile);
  
  }
  get controls():FormGroup {
    return (<FormGroup>this.pictureForm.get('caption'));
    //return (<FormArray>this.frmStepThree.controls.get('pictures'));
  }

  get picture(): any { 
    return this.pictureForm.controls;
  }
 
}
