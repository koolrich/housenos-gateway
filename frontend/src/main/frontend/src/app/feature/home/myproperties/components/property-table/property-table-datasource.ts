import {DataSource,CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { of } from 'rxjs/observable/of';
import { mergeMap, catchError,finalize } from 'rxjs/operators';
import { ISubscription } from 'rxjs/Subscription';


import { PropertyService } from '../../../../shared/services/myProperties.service';
import { Property} from '../../../../shared/models/property.model';





export class PropertyDataSource implements DataSource<Property> {

    private propertySubject = new BehaviorSubject<Property[]>([]); //for broadcasting property data
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public properties: Property[];
    private propertySubjectSub: ISubscription;

    constructor(private propertyService: PropertyService) {

        const propertySubjectSub =this.propertySubject.subscribe(data =>this.properties=data);
    }

    connect(collectionViewer: CollectionViewer): Observable<Property[]> {
        return this.propertySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.propertySubject.complete();
        this.loadingSubject.complete();
    }

    loadProperty( userId='',filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 3, propertyId='') {

        this.loadingSubject.next(true);

        this.propertyService.findProperty( userId,filter, sortDirection,
            pageIndex, pageSize,propertyId).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(property => this.propertySubject.next(property));
    }    

    ngOnDestroy(){
        //unsubscribe propertySubjectSub Observable
        this.propertySubjectSub.unsubscribe();

    }

}