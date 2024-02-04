import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditChangePasswordComponent} from './edit-change-password.component';

describe('EditChangePasswordComponent', () => {
  let component: EditChangePasswordComponent;
  let fixture: ComponentFixture<EditChangePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditChangePasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
