import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertysearchComponent } from './propertysearch.component';

describe('PropertysearchComponent', () => {
  let component: PropertysearchComponent;
  let fixture: ComponentFixture<PropertysearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertysearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
