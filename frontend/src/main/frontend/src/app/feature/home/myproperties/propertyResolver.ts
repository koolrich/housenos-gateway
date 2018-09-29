import { Injectable } from '@angular/core';
import { PropertyService } from '../../shared/services/myproperties.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PropertyResolver implements Resolve<any> {
  constructor(private propertyService: PropertyService ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const userid= + route.paramMap.get('userid')
    return this.propertyService.getPropertyList(userid);
  }
}