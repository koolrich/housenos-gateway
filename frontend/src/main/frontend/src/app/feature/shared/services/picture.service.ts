import {DataSource,CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { of } from 'rxjs/observable/of';
import { mergeMap, catchError,finalize } from 'rxjs/operators';
import { ISubscription } from 'rxjs/Subscription';
import { HttpClient,HttpParams} from '@angular/common/http'
import { PropertyService } from './myProperties.service';
import { Picture } from '../../shared/models/picture.model';
import { Injectable } from '@angular/core';




@Injectable()
export class PictureService {
    // Observable picture sources
    private pictureSource = new BehaviorSubject<Picture[]>([]); //for broadcasting picture data
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public pictures: Picture[];
    private pictureSubjectSub: ISubscription;

    constructor(private _http:HttpClient) {

        const propertySubjectSub =this.pictureSource.subscribe(data =>this.pictures=data);
    }

    // Observable string streams
    picture$ = this.pictureSource.asObservable();
   
    // Service message commands
    uploadPicture(picture: Picture[]) {
        
        this.pictureSource.next(picture);
    }
    

    public postUploadFile(fileToUpload: File,description:string,data?:any) {
        const endpoint='http://localhost:4200/api/uploadPicture';
        const _formData = new FormData();
       
        _formData.append("pictureDescription", description);
        _formData.append("pictureFile", fileToUpload,fileToUpload.name);
        
       
       return this._http.post(endpoint,  _formData, {params: new HttpParams().set('id', '56784'),reportProgress: true});
    }
   

    
    ngOnDestroy(){
        //unsubscribe propertySubjectSub Observable
        this.pictureSubjectSub.unsubscribe();

    }

}