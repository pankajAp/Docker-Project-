import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditUserRoleActionComponent} from './edit-user-role-action.component';

describe('EditUserRoleActionComponent', () => {
  let component: EditUserRoleActionComponent;
  let fixture: ComponentFixture<EditUserRoleActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserRoleActionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserRoleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
