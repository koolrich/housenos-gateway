import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUploadPictureComponent } from './list-upload-picture.component';

describe('ListUploadPictureComponent', () => {
  let component: ListUploadPictureComponent;
  let fixture: ComponentFixture<ListUploadPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUploadPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUploadPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
