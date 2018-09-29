import { Component, SimpleChanges,OnInit,ElementRef, Renderer2,ViewChild ,ViewChildren,QueryList} from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription }   from 'rxjs';
import {  map,tap,distinctUntilChanged,debounceTime  } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import { SafePipe } from '../../../../../shared/services/safePipe.transform';
import { Picture } from '../../../../../shared/models/picture.model';
import { UploadPictureComponent } from '../upload-picture.component';
import { PictureService } from '../../../../../shared/services/picture.service';


@Component({
  selector: 'list-upload-picture',
  templateUrl: './list-upload-picture.component.html',
  styleUrls: ['./list-upload-picture.component.scss']
})
export class ListUploadPictureComponent implements OnInit {
  listPictureForm: FormGroup;
  pictureForm: FormGroup;
  formData = new FormData();
  elementRef:ElementRef;
  selectedFile:{};
  isDefaultFile:boolean=false;
  isHideFileDescr:boolean=true;
  subscription: Subscription;
  mypictures:any[]=[];

  
  //@ViewChild(UploadPictureComponent) isDefaultFile: ElementRef;
 // @ViewChild('fileDescription') fileDescriptionElem: ElementRef;
  //@ViewChildren('caption') captionElemChildren: QueryList< ListUploadPictureComponent>;
  constructor(private fb: FormBuilder,private renderer: Renderer2,elementRef: ElementRef,private pictureService:PictureService) { 
    this.elementRef = elementRef;
    this.pictureForm = this.fb.group({
        file:[''],
        name: [''],
        caption: [''],
        url:['']
        });

      this.listPictureForm = this.fb.group({
        id:[],
        property_id:[],
        pictures: this.fb.array([this.pictureForm])
      } )
      
      this.pictureForm.valueChanges.subscribe((changes) => { console.log('mytrack change',changes); }) 
  }
  
  ngOnInit() {
    

    this.subscription = this.pictureService.picture$.subscribe(
      picture => {
        console.log('initial lenght picture',picture)
        if(picture){
          console.log('construct pic',picture)
            this.addPicture(picture);
          
        }
     
    });
    /*change  value
   //this.onChange();
    for (let val of this.pictures.controls) {
      val.get('caption').valueChanges.subscribe(data=>{
        console.log('caption inout:',data)
      })
    }
   // if (this.listPictureForm.value.lenght>=0){
      console.log('track change');
      this.listPictureForm.
        valueChanges.debounceTime(2000).
        subscribe(form => {
          //alert('listform changes')
          sessionStorage.setItem('form', JSON.stringify(form));
          let formValues = sessionStorage.getItem('form');
          if (formValues) {
            this.applyFormValues(this.listPictureForm, JSON.parse(formValues));
          }
        });
    //  }
    */

  

     this.onChanges()
    
  }

  onChanges(): void {
    console.log('On changes');
   // this.listPictureForm.get('pictures').valueChanges.subscribe((changes) => { console.log('mytrack change',changes); }) 
   //const ctrl =(<FormArray> (<FormGroup>this.listPictureForm).controls['pictures']).controls['caption'];
  // console.log('caption control',ctrl);
   //this.pictureForm.valueChanges.subscribe((changes) => { console.log('mytrack change',changes); }) 
  // (<FormArray>this.listPictureForm.controls['pictures']).at(0).valueChanges.subscribe((changes) => { console.log('mytrack change',changes); }) 
   //this.listPictureForm.get('pictures.caption')!.valueChanges.subscribe(data => {
    //console.log('Listem to Form changes', data);
//});
/*
const caption =  <FormControl>(this.listPictureForm.get('pictures.caption'));
caption!.valueChanges.subscribe(data => {
            console.log('Form changes', data);
        })
        */
  /*
  (<FormGroup>this.pictures.get('caption')).valueChanges.subscribe(values => {
    console.log('another tracking:',values);
 // this.applyFormValues(this.listPictureForm, JSON.parse(values));
  });
*/
  }
    

  
  _onChanges(): void {
    console.log('On changes')

    
    this.listPictureForm.valueChanges.pipe(
              debounceTime(2000),
              distinctUntilChanged(),
              tap((form) => {
                    //console.log("tapping searchItem",data);
                    sessionStorage.setItem('form', JSON.stringify(form));
                    let formValues = sessionStorage.getItem('form');
                    if (formValues) {
                      this.applyFormValues(this.listPictureForm, JSON.parse(formValues));
                    }
              })
          ).subscribe();

  }
  private applyFormValues (group, formValues) {
    console.log('executing applyformvalue')
    Object.keys(formValues).forEach(key => {
      let formControl = <FormControl>group.controls[key];
      if (formControl instanceof FormGroup) {
        this.applyFormValues(formControl, formValues[key]);
      } else {
       // formControl.setValue(formValues[key]);
        console.log('applyformvalue',this.listPictureForm.value)
        console.log('this.listPictureForm:',this.listPictureForm,)
      }
    });

  }

  ngAfterViewInit() {
   // console.log('Element',this.fileDescriptionElem.nativeElement);
  }
  

  initListPictureForm(picture?:Picture) {
    let name:string;
    let caption:string;
    let url:string 
    let file:File
    // const startTime = new Date(Date.now())
    if (picture){
        name=picture.name;
        file=picture.file;
        caption=picture.caption;
        url=picture.url;
        
    } else{
    name='';
    caption='';
    file= null;
    url='';
    }
    return this.fb.group({

        name: [name],
        caption: [caption],
        file:[file],
        url:[url]
    });
  }
  addPicture(picture?:Picture[]) {
    const pictureControl=<FormArray>this.listPictureForm.controls.pictures;
   //this.mypictures=this.listPictureForm.get('pictures');
      for(let i=0;i<=picture.length-1;i++){
        //console.log('picture Array',picture[i])
         pictureControl.push(this.initListPictureForm(picture[i]));
      }
 // }
  }
  addDesription(index,event) {
      /*const control = <FormArray>this.frmStepThree.controls['files'];
      let selectedItem=this.previewData[index];
      Object.assign(selectedItem,{caption:caption})
      this.previewData.splice(index,1,selectedItem)
      */
    console.log('descr  event',event.target.value + index);
      this.listPictureForm.value.pictures[index].caption = event.target.value;

      console.log('new add descr',this.listPictureForm.value);
    // control.push(this.initPicture(picture));
  }
  handleFileClick (index,data) {
    const fileElem=this.elementRef.nativeElement.querySelector('#file'+index);
    console.log('form img',fileElem)
    const preSelectedElem=this.elementRef.nativeElement.querySelector('.selectedFile');
    if(preSelectedElem!==null){
    
    this.renderer.removeClass(preSelectedElem,'selectedFile');
    }
    //set focus of selected file
    this.renderer.addClass(fileElem,'selectedFile');
    this.selectedFile=data.src;
}
  removeFile(index){
      const pictureControl=<FormArray>this.listPictureForm.controls.pictures;
      pictureControl.removeAt(index);
      //get selected data
      let data=pictureControl[index];
      const selectedFile=this.selectedFile;
      //remove file from source and form
      this.formData.delete(data);
      //this.previewData.splice(data,1);
      //move focus to another picture
      if(selectedFile==data.src){
          let len =this.listPictureForm.get('pictures').value.length;
          if (this.listPictureForm.get('pictures').value[len-1]){
              this.selectedFile=this.listPictureForm.get('pictures').value[len-1].src;
          }else  {
              this.selectedFile="";
              this.isDefaultFile=true;
          }

      }
  }


  toggleShowFileDescription(index,event){
    console.log('DOM','#fileDescription'+index)
   
      //get file caption DOM element
      const inputElem=this.elementRef.nativeElement.querySelector('#caption'+index);
     // const control=this.elementRef.nativeElement.querySelector('#caption'+index);
      //const inputElem=<FormArray>this.listPictureForm.controls.pictures[index];
     // let inputElem = this.listPictureForm.get('pictures') as FormArray;
      //let item =inputElem.at(index).get('caption');
     // const control = (<FormArray>this.listPictureForm.controls['pictures']).at(index).get('caption') as FormArray;
      //const control= this.captionElemChildren.first;
     // console.log('toggle descript',inputElem)
      console.log('toggle element selectedt',inputElem)
    

      if(this.isHideFileDescr){
        this.renderer.addClass(inputElem, 'showDesc'); 
        this.isHideFileDescr=false; 
    }else {
        this.renderer.removeClass(inputElem,'showDesc'); 
        this.isHideFileDescr=true; 
    }
      console.log('listPictureForm',this.listPictureForm.value)
  }

  get pictures(): FormArray { 
    return this.listPictureForm.get('pictures') as FormArray; 
 }

 get __pictureForm(){ 
    return this.fb.group({
        name: [''],
        caption: [''],
        src:[''],
        url:['']
        });
}
 
  
  
  set _pictureForm(picture:Picture){ 
    this.fb.group({
      name: [picture.name],
      caption: [''],
      src:[''],
      url:['']
      });
  }
 ngOnChanges(changes: SimpleChanges) {}

 ngOnDestroy() {
  // prevent memory leak when component destroyed
  this.subscription.unsubscribe();
}

}
