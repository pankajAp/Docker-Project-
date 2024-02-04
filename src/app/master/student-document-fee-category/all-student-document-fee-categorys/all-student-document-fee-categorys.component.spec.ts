import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllStudentDocumentFeeCategorysComponent} from './all-student-document-fee-categorys.component';

describe('AllStudentDocumentFeeCategorysComponent', () => {
  let component: AllStudentDocumentFeeCategorysComponent;
  let fixture: ComponentFixture<AllStudentDocumentFeeCategorysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllStudentDocumentFeeCategorysComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStudentDocumentFeeCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
