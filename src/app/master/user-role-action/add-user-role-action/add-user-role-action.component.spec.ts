import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddUserRoleActionComponent} from './add-user-role-action.component';

describe('AddUserRoleActionComponent', () => {
  let component: AddUserRoleActionComponent;
  let fixture: ComponentFixture<AddUserRoleActionComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserRoleActionComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserRoleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
