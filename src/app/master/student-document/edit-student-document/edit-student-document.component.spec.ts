import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditStudentDocumentComponent} from './edit-student-document.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditStudentDocumentComponent;
  let fixture: ComponentFixture<EditStudentDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditStudentDocumentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
