import { Component, Output, EventEmitter, Input, ViewChild,AfterViewInit, ElementRef, Renderer2, ViewChildren,QueryList, OnInit, OnChanges,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators, FormControl } from '@angular/forms';
import {  map,tap,distinctUntilChanged,debounceTime  } from 'rxjs/operators';
import { Subscription }   from 'rxjs';
import { AddPropertyComponent } from '../add-property.component';
import { Picture } from '../../../../../shared/models/picture.model';
import value from '*.json';
import { StepTwoComponent } from '../step-two/step-two.component';
import { PictureService } from '../../../../../shared/services/picture.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SafePipe } from '../../../../../shared/services/safePipe.transform';
import { PictureFormComponent } from '../step-three/picture-form/picture-form.component';
import { PropertyService } from '../../../../../shared/services/myproperties.service';
import { MatDialog, MatDialogRef} from '@angular/material';
import { CaptionDialogComponent } from './caption-dialog.component';

@Component({
    selector: 'step-three-component',
    templateUrl: './step-three.component.html',
    styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit, AfterViewInit,OnChanges{    
    frmStepThree: FormGroup;
    formData = new FormData();
    subscription: Subscription;
    previewData = [];	
    img: string;
    selectedFile:{caption:string,url:string};
    isDefaultFile:boolean=true;
    isHideFileDescr:boolean=true;
    fileDescription:string;
    displayOrder:number=0;
    files :string;
    disabled: boolean = false;
    captionDialogRef: MatDialogRef<CaptionDialogComponent>;
    @ViewChild(PictureFormComponent) pictureForm : PictureFormComponent;
    @ViewChild('fileDescription') fileDescriptionElem: ElementRef;
    
    constructor(private fb: FormBuilder,
                private renderer: Renderer2,
                private elementRef: ElementRef,
                private pictureService:PictureService,
                private domSanitizer: DomSanitizer,
                private propertyService: PropertyService, 
                private sanitizer: DomSanitizer,
                private dialog: MatDialog)  {

                this.elementRef = elementRef;
        
       
    }

    ngOnInit() {
        // picture form
        this.frmStepThree = this.fb.group({
            pictures: this.fb.array([])
         } )
    
       
        //subscribe to uploaded picture services
        this.subscription = this.pictureService.picture$.subscribe(
            pictures => {
              
                if(pictures.length){
                  this.addPicture(pictures); 
                  this.isDefaultFile=false;
                }
            }
        );
       
            
       // this.ngOnChanges();
    }
    ngAfterViewInit() {}
        
    
    
    // Initialise or patch form with values
    initPictureForm(picture?:Picture) {    
        if (picture){
            //this.selectedFile=picture.url;
            this.selectedFile={caption:picture.caption,url:picture.url}
            
            return this.fb.group({
                name: [picture.name],
                caption: [picture.caption],
                file:[picture.file],
                url:[picture.url]
            });
        }
    }

    addPicture(picture?:Picture[]) {
        
        for(let i=0;i<=picture.length-1;i++){
            this.pictures.push(this.initPictureForm(picture[i]));
        }
       
    }
    addDesription(index,event) {
        //set file caption value
        this.frmStepThree.value.pictures[index].caption = event.target.value;

       
    }
    handleFileClick (index,src?) {
        const fileElem=this.elementRef.nativeElement.querySelector('#picture'+index);
        const caption=this.frmStepThree.value.pictures[index].caption ;
        let scr=src;
        if(!src){
            src=this.frmStepThree.value.pictures[index].url;
        }
        const preSelectedElem=this.elementRef.nativeElement.querySelector('.selectedFile');
        if(preSelectedElem!==null){
        
        this.renderer.removeClass(preSelectedElem,'selectedFile');
        }
        //set focus of selected file
        this.renderer.addClass(fileElem,'selectedFile');
        
        this.selectedFile={url:src,caption:caption};
        
    }
    removeFile(index,src){
        
        //remove selected picture
        this.pictures.removeAt(index);
        
         //move focus of next selected file after file remove
        if (this.pictures.at(index+1) ){
            this.handleFileClick (index+1) 
        }else if(this.pictures.at(index-1)){
            this.handleFileClick (index-1);
        }else if(!this.pictures.at(index+1) && this.pictures.length==1){
            this.handleFileClick (0);
        }
        
        else{
            
            this.selectedFile=null;
            this.isDefaultFile=true;
        }
       
        
    }


    toggleShowFileDescription(index,event){
        //get file caption DOM element
        const inputElem=this.elementRef.nativeElement.querySelector('#caption'+index);
        
        if(this.isHideFileDescr){
            this.renderer.addClass(inputElem, 'showDesc'); 
            this.isHideFileDescr=false; 
        }else {
            this.renderer.removeClass(inputElem ,'showDesc'); 
            this.isHideFileDescr=true; 
        }
        
        
    }

    openCaptionDialog(index) {
        const myCaption=this.frmStepThree.value.pictures[index].caption;
        this.captionDialogRef = this.dialog.open(CaptionDialogComponent, {
          data: {
            caption: myCaption ? myCaption : ''
          }
        });

        // take action after dialog is closed
        this.captionDialogRef.afterClosed()
        .subscribe(newCaption=> {
            
            if (newCaption) {
                this.frmStepThree.value.pictures[index].caption=newCaption;
                const src=this.frmStepThree.value.pictures[index].url;
                //const inputElem=this.elementRef.nativeElement.querySelector('#caption'+index);
                const inputElem=this.elementRef.nativeElement.querySelector('#captions'+index);
                //set picture caption to DOM element
                inputElem.innerHTML =newCaption;
                //set focus of picture
                this.handleFileClick(index,src)
               
            }
            
        });
    
    
    }

   ngOnChanges(changes: SimpleChanges): void {
    console.log('On changes Steps',);
    
    if(this.selectedFile){
        this.isDefaultFile=false;
    }else{
        this.isDefaultFile=true
    }
    this.pictures.controls.forEach(control => {
        console.log("tapping searchItem");
        //control.valueChanges.subscribe(data=>{console.log("tapping searchItem",data);})
    });

    /*
  (<FormArray> this.frmStepThree.controls.pictures).get('capture').valueChanges.pipe(
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
          */

  }
   /*
    addVariant() {
        // code here for adding control
        const myfile =(<FormArray> (<FormGroup>this.frmStepThree).controls['pictures']);
        const ctrl =(<FormGroup>(<FormArray> (<FormGroup>this.frmStepThree).controls['pictures']).controls['caption']);
        console.log('addVariant',myfile.value[0])
        // check length   
        if(myfile.length>=0) {
          // iterate each object in array
          for( let i=0;i<=myfile.length;i++) {
           //myfile.value[i].caption=
            // listen to changes in each barcode, if change, do something!
            ctrl.valueChanges.subscribe(data =>{alert('listen to change');})
            myfile.valueChanges.subscribe(data => {
                console.log('get caption',this.frmStepThree.get('caption').value)
                 // do something!
            })
            console.log('my addvariant',myfile.value[i].name);
          }
        } 
      }
  */
  

      // disable input box
    disableInput(): void {
        this.disabled = true;
    }

      // enable input box
    enableInput(): void {
        this.disabled = false;
    }


/*new method

imageChange(input){
    this.file_src = "//placehold.it/200";
    // Loop through each picture file
    this.files = (input.target.files[0]);

    // Create an img element and add the image file data to it
    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(input.target.files[0]);

    // Create a FileReader
    var reader = new FileReader();

    // Add an event listener to deal with the file when the reader is complete
    reader.addEventListener("load", (event:any) => {
    // Get the event.target.result from the reader (base64 of the image)
      img.src = event.target.result;

      // Resize the image
      var resized_img = this.resize(img);
      // Push the img src (base64 string) into our array that we display in our html template
      this.file_src = resized_img;
      }, false);

    reader.readAsDataURL(input.target.files[0]);
        //}
  }
  resize (img, MAX_WIDTH:number = 500, MAX_HEIGHT:number = 500){
    var canvas = document.createElement("canvas");


    var width = img.width;
    var height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, width, height);

    var dataUrl = canvas.toDataURL('image/jpeg');
    // IMPORTANT: 'jpeg' NOT 'jpg'
    return dataUrl
  }
  */

    //append file object to formdata
    appendFormdata(FormData, data, name){
        name = name || '';
        if (typeof data === 'object'){
            for(let key in data){ 
                if (name == ''){
                    this.appendFormdata(FormData, data[key],key);
                } else {
                    this.appendFormdata(FormData, data[key], name + '['+key+']');
                }
            }
        } else {
            FormData.append(name, data);
        }

    }

    
   // retrun picture formarray 
    get pictures1():FormArray {
       return this.frmStepThree.get('pictures') as FormArray;
       
    }
    get pictures():FormArray {
        return this.frmStepThree.get('pictures') as FormArray;
        
     }
    // retrun picture formarray 
    get pics():FormArray{
        //return <FormArray>this.frmStepThree.controls['pictures'].controls;
        return this.frmStepThree.controls['pictures'] as FormArray;
     }
     // retrun picture formarray 
     get captions():FormArray {
        return this.frmStepThree.get('pictures.caption') as FormArray;
        
     }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
      }
    public onSubmit(){}
    
    public reset(){
        this.frmStepThree.reset();
        //this.stepThreeComponent.frmStepThree.value.pictures.patchValue([]);
        this.frmStepThree.setControl('pictures', this.fb.array([ ]));
        this.selectedFile=null;
        this.isDefaultFile=true;
    }
    // trigger submit for addProperty
    onSubmitForms(){
          
        this.propertyService.publish('submitForm');
    }
    preSubmitForms(){
        this.propertyService.publish('preSubmitForm');
    }
}


/*
//disable
  form = new FormGroup({
    'first': new FormControl(),
    'second': new FormControl({value: '', disabled: formValue => formValue.first === 'something'})
  })




      */
