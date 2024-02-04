import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogAssigneeComponent } from './form-dialog-assignee.component';

describe('FormDialogComponent', () => {
  let component: FormDialogAssigneeComponent;
  let fixture: ComponentFixture<FormDialogAssigneeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDialogAssigneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
