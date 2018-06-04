import { Injectable } from '@angular/core';

import { STATES } from './model/states';
import { ROLES } from './model/roles';


@Injectable()
export class ReferenceDataService {

  constructor() { }

  getStates(): string[] {
    return STATES;
  }

  getRoles(): string[] {
    return ROLES;
  }

}
