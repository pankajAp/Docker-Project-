import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditComplaintOfficeComponent} from './edit-complaint-office.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditComplaintOfficeComponent;
  let fixture: ComponentFixture<EditComplaintOfficeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditComplaintOfficeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplaintOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
