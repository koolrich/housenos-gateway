import { Component, OnInit,ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSource} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {SelectionModel} from '@angular/cdk/collections';
import { MaterialModule  } from '../../../../../material/material.module';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map,switchMap, catchError, tap, filter,distinctUntilChanged,debounceTime  } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { PropertyService } from '../../../../shared/services/myproperties.service';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { of as observableOf } from 'rxjs/observable/of';

import { Property} from '../../../../shared/models/property.model';
import { PropertyStatus } from '../../../../shared/models/propertyStatus.model';
import { PropertyType } from '../../../../shared/models/propertyType.model';

import { PropertyDataSource } from '../property-table/property-table-datasource';
                          

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.scss']
})
export class PropertyTableComponent implements OnInit {
    //define data source for property table
    displayedColumns = ['select','type', 'title', 'city','state', 'status','actions'];
    public selectedCriteria: String = '';
   // private properties$: Observable<Property[]>;
    private properties: Property[];
    private property:Property;
    public propertyCount: Number;
    private titleValue: String;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource: PropertyDataSource;
    filterForm: FormGroup;
    private searchField: FormControl;
    private results: Observable<Property[]>;
    formattedMessage: string;
    selection = new SelectionModel<Property>(true, []);
    propertyStatuses : PropertyStatus [] = [
          {key: 1,value: 'Active'},
          {key: 2,value:'OnSchedule'},
          {key: 3,value:'Hold'}

    ];
    propertyTypes : PropertyType [] = [
      {key: 1,value: 'Self Contain'},
      {key: 2,value:'Flat'},
      {key: 3,value:'Duplex'}

    ];

  /*inject Property service into PropertyTable component
   subscribe to object of type property
  */
    constructor( private propertyService: PropertyService,private _router: Router, 
              private _route: ActivatedRoute, fb: FormBuilder) { 
              this.filterForm=fb.group({
                    propertyTitle:[''],
                    propertyType:[''],
                    propertyStatus:['']

              })
              this.onChanges();
    }
  

    ngOnInit() {
      //load the table datasource with data
      this.property = this._route.snapshot.data["property"];
      this.dataSource = new PropertyDataSource(this.propertyService);
      this.dataSource.loadProperty( '', '', 'asc', 0, 3,'');
      //get number of records returned
      this.propertyCount =Object.keys(this.property).length;
      this.properties=this.dataSource.properties;
      
    }

    ngAfterViewInit() {
       // reset the paginator after sorting
       this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
      merge (this.sort.sortChange,this.paginator.page)
        .pipe(
            tap(() => this.loadPropertyPage())
        )
        .subscribe();

       
    }
    
     /** Whether the number of selected elements matches the total number of rows. */
     isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.properties.length;
      return numSelected === numRows;
    }
  
     
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      
      this.isAllSelected() ?
      this.selection.clear() :
      //this.properties.forEach(row => 
          // key: the name of the object key
          // index: the ordinal position of the key within the object 
          //this.selection.select(1);
         // console.log('object missing',this.selection.select(row)));
      
         this.properties.forEach(row =>  this.selection.select(row));
    }

    loadPropertyPage() {
      
      //this.masterToggle(); => enable for checkbox checked on next page
       this.dataSource.loadProperty(
          '<userId>',
          '',
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.property.id);
    }
  
    onChanges(): void {
      this.filterForm.valueChanges
          .pipe(
                debounceTime(2000),
                distinctUntilChanged(),
                tap((data) => {
                      //console.log("tapping searchItem",data);
                      this.dataSource.loadProperty('', data, 'asc', 0, 3);
                      })
            ).subscribe();
  
  }

    editProperty(property:Property)  {
        if (property) {
        this._router.navigate(['properties/editProperty', { id: this.property.id }]);
        } else {
          this._router.navigate(['properties/manage']);
        }
  
  
    }
   //clear title control field
  clear () {
    this.filterForm.get('propertyTitle').reset();
    
  }
    
/*
  public applyFilter(data: any) {
    console.log('applyfilter',this.filterForm.get('title'));
      this.filterForm.get('title').valueChanges
      .debounceTime(1000).pipe(
        switchMap(() => {
                    return observableOf({});
                    }),
       tap((data) => {
            this.paginator.pageIndex = 0;
            //this.loadLessonsPage();
            console.log('applyfiltyer',data);
            this.dataSource.loadProperty( + this.property.id, 'searchItem', 'asc', 0, 3);
    
        }))
        .subscribe();
      
    
  }
  */

}










