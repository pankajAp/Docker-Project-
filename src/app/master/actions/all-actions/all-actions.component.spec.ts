import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllActionsComponent} from './all-actions.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllActionsComponent;
  let fixture: ComponentFixture<AllActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
