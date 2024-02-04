import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddRoleActionComponent} from './add-role-action.component';

describe('AddStudentDocumentFeeCategoryComponent', () => {
  let component: AddRoleActionComponent;
  let fixture: ComponentFixture<AddRoleActionComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoleActionComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
