import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllRoleActionsComponent} from './all-role-actions.component';

describe('AllStudentDocumentFeeCategorysComponent', () => {
  let component: AllRoleActionsComponent;
  let fixture: ComponentFixture<AllRoleActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllRoleActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRoleActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
