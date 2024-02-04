import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllComplaintBuildingsComponent} from './all-complaint-buildings.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllComplaintBuildingsComponent;
  let fixture: ComponentFixture<AllComplaintBuildingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllComplaintBuildingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllComplaintBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
