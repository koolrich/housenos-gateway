import { Component, Output, EventEmitter, Input, ViewChild,AfterViewInit, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators, FormControl } from '@angular/forms';
//import { AddPropertyComponent } from '../add-property.component';
import { Picture } from '../../../../shared/models/picture.model';
import value from '*.json';
//import { StepTwoComponent } from './step-two.component';
import { PictureService } from '../../../../shared/services/picture.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SafePipe } from '../../../../shared/services/safePipe.transform';
import { promise } from 'protractor';

@Component({
  selector: 'upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {
   //formData = new FormData();
    previewData = [];   
    //img: string;
    selectedFile:{};
    isDefaultFile:boolean=true;
    //isHideFileDescr:boolean=true;
    //fileDescription:string;
    elementRef:ElementRef;
    //displayOrder:number=0;
   // result:string;
    //pictures:Picture[]=[];
    pictures=[];
   // file_src:string;
    //files :string;
    src: string;
    @Input('visible') private visible:boolean;

    @ViewChild('fileUpload') fileUpload : ElementRef;
    @ViewChild('fileDescription') fileDescriptionElem: ElementRef;
    
    constructor(private renderer: Renderer2,elementRef: ElementRef,private sanitizer: DomSanitizer,private pictureService:PictureService) { }

    ngOnInit() {}
     
    

    handleDrag(event) {
      
      event.preventDefault(); 
    }
    uploadFile(event,type){
        event.preventDefault();
        let promises=[];
        let files:FileList;
        if(type == "formControl"){
            files = event.target.files;
            
        } else if(type === "drop"){
            files = event.dataTransfer.files;
        }
        
        for(let i=0;i<files.length;i++){
          let file = files[i];
          this.pictures=[];
          if(file.type.indexOf("image") !== -1){
              promises.push(this.previewFile(file,i).then(s=> this.pictures.push(s))); 
                      
          } else {
              alert(file.name + " is not supported.Please choose image file");
          }
        }
        Promise.all(promises).then(res => this.pictureService.uploadPicture(this.pictures));
    }   

  

    previewFile(file,index){
        
        let reader = new FileReader();
        let src=this.src
        let previewData=this.previewData;
        let selectedFile=src;
        const fileName = file.name;
        let imageUrl;
        let promise=new Promise(
            function (resolve,reject){
                // Create an img element and add the image file data to it
                
                reader.onloadend = () => {
                    
                    let img = document.createElement("img");
                    src=window.URL.createObjectURL(file);
                    let size = ((file.size/(1024*1024)) > 1)? (file.size/(1024*1024)) + ' mB' : (file.size/     1024)+' kB';
                    const selectedFile=src;
                        
                    // Get the event.target.result from the reader (objectURI of the image)
                    img.src = window.URL.createObjectURL(file);
                    img.onload = function () {
                        let canvas = document.createElement("canvas");  
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
            
                        let MAX_WIDTH = 300;
                        let MAX_HEIGHT = 300;
                        let width = img.width;
                        let  height = img.height;
                        
                        if (width > height) {
                          if (width > MAX_WIDTH) {
                            console.log('width > MAX_WIDTH',width)
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
                                        
                        //Export the canvas as a blob by specifying MIME type, image quality.
                        ctx.canvas.toBlob((blob) => {
                                    imageUrl=window.URL.createObjectURL(blob);
                                    const files = new File([blob], fileName, {
                                                type: 'image/jpeg',
                                                lastModified: Date.now()
                                    });
                                  
                                    previewData.push({'name':file.name,'size':size,'type':file.type,
                                                                'url':imageUrl});
                                    console.log('previewDate',previewData);
                                    //set picture object
                                    const picture:Picture={
                                                name:file.name,
                                                caption:'',
                                                file:files,
                                                url:imageUrl
                                    };
                                    
                                    resolve(picture);

                        }, 'image/jpeg', 1);

                                        
                    } // end img.onload
                        
                        
                }//end reader.onloadend

                  reader.readAsDataURL(file);


                  
            }
        ) 
        return promise;
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

}

