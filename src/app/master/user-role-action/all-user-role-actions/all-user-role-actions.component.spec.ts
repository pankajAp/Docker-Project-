import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllUserRoleActionsComponent} from './all-user-role-actions.component';

describe('AllUserRoleActionsComponent', () => {
  let component: AllUserRoleActionsComponent;
  let fixture: ComponentFixture<AllUserRoleActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllUserRoleActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserRoleActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
