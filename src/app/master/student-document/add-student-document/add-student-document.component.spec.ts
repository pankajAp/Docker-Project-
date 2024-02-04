import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddStudentDocumentComponent} from './add-student-document.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddStudentDocumentComponent;
  let fixture: ComponentFixture<AddStudentDocumentComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudentDocumentComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
