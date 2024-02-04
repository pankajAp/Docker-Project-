import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllFeeCategorysComponent} from './all-fee-categorys.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllFeeCategorysComponent;
  let fixture: ComponentFixture<AllFeeCategorysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllFeeCategorysComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFeeCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
