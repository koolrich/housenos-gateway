import { Injectable } from '@angular/core';

import { STATES } from './states';

@Injectable()
export class ReferenceDataService {

  constructor() { }

  getStates(): string[] {
    return STATES;
  }

}
