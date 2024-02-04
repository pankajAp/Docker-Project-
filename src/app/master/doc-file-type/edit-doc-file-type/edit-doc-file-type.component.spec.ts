import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditDocFileTypeComponent} from './edit-doc-file-type.component';

describe('EditCalendarEventDetailsComponent', () => {
  let component: EditDocFileTypeComponent;
  let fixture: ComponentFixture<EditDocFileTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocFileTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocFileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
