import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllStudentDocumentsComponent} from './all-student-documents.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllStudentDocumentsComponent;
  let fixture: ComponentFixture<AllStudentDocumentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllStudentDocumentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStudentDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
