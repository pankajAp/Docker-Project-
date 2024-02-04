import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditRoleActionComponent} from './edit-role-action.component';

describe('EditStudentDocumentFeeCategoryComponent', () => {
  let component: EditRoleActionComponent;
  let fixture: ComponentFixture<EditRoleActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditRoleActionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
