import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../shared/services/myproperties.service';
import { Observable }   from 'rxjs/Observable';
import { Property} from '../../shared/models/property.model';
//import { ValueArrayPipe} from '../../shared/models/valueArray';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myproperties',
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.scss']
})
export class MyPropertiesComponent implements OnInit {
 
  private properties$: Observable<Property[]>;
  private errorMessage:any='';
  
  
  constructor(private propertyService: PropertyService,private _router: Router) { 
  
    
  }


  ngOnInit() {
    
  
  }
  createProperty()  {
    this._router.navigate(['/properties/manage/create']);
    

  }
 

}

