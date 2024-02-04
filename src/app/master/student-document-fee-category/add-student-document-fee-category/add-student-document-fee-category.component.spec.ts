import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddStudentDocumentFeeCategoryComponent} from './add-student-document-fee-category.component';

describe('AddStudentDocumentFeeCategoryComponent', () => {
  let component: AddStudentDocumentFeeCategoryComponent;
  let fixture: ComponentFixture<AddStudentDocumentFeeCategoryComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudentDocumentFeeCategoryComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentDocumentFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
