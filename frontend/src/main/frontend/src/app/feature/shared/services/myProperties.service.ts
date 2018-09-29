import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Property} from '../../shared/models/property.model';
import { Address} from '../../shared/models/address.model';
import * as data_json  from "../../shared/models/property/property.json";
//import { PropertyDataSource } from './components/property-table/property-table.component';
import 'rxjs/add/operator/shareReplay';
import {HttpParams} from "@angular/common/http";

@Injectable()
export class PropertyService {
    //specify URL for Restful API
    private ApiURL="";
    private serviceUrl = 'assets/property.json';
    private _subjects: Subject<any>[]  = [];
 
    constructor(private http: HttpClient) { }
  
  
    getProperty() {
        return this.http.get(this.serviceUrl);
    }

    public getPropertyList(propertyId:number): Observable<Property[]> {

        return this.http.get(this.serviceUrl)
                .map((data: any[]) => data.map((property) => 
                new Property(property)
                ));
    
    }
    /*
    getData() {
        return this.http.get('path_to_your_json')
        .map((response) => {
            let result = [];
            response.forEach(object => {
                result.push(new Property(object));
            });
            return result;
        })
    }
    */

    //find property including pagination
    public findProperty(userId:string,filter:string = '', sortOrder = 'asc',
                      pageNumber = 0, pageSize = 3,propertyId?:string):  Observable<any> {
        const params = new HttpParams()
              .set('userId', userId)
              .set('filter', filter)
              .set('sortOrder', sortOrder)
              .set('pageNumber', pageNumber.toString())
              .set('pageSize', pageSize.toString())
              .set('propertyId', propertyId.toString());
              
        
        return this.http.get(this.serviceUrl)
             .map((data: any[]) => data.map((property) => 
                 new Property(property)
             ))
             .catch(error => { 
                return this.handleError(error);
              });
             
    }

    private handleError(error:any){
        let errMsg = (error.message) ? error.message:
                    error.status ? `${error.status}-${error.statusText}`:'Server error';
        console.error('from handle error',errMsg);
        return Observable.throw(errMsg);
    }
    // methods for calling parent function from child component
    publish(eventName: string) {
        // ensure a subject for the event name exists
        this._subjects[eventName] = this._subjects[eventName] || new Subject();
         
        // publish event
        this._subjects[eventName].next();
    }
         
    on(eventName: string): Observable<any> {
        // ensure a subject for the event name exists
        this._subjects[eventName] = this._subjects[eventName] || new Subject();
         
        // return observable
        return this._subjects[eventName].asObservable();
    }

}



