import { TestBed, inject } from '@angular/core/testing';

import { ReferencedataService } from './referencedata.service';

describe('ReferencedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferencedataService]
    });
  });

  it('should be created', inject([ReferencedataService], (service: ReferencedataService) => {
    expect(service).toBeTruthy();
  }));
});
