import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditStudentDocumentFeeCategoryComponent} from './edit-student-document-fee-category.component';

describe('EditStudentDocumentFeeCategoryComponent', () => {
  let component: EditStudentDocumentFeeCategoryComponent;
  let fixture: ComponentFixture<EditStudentDocumentFeeCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditStudentDocumentFeeCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentDocumentFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
