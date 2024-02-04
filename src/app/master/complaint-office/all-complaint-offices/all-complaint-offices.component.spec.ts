import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllComplaintOfficesComponent} from './all-complaint-offices.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllComplaintOfficesComponent;
  let fixture: ComponentFixture<AllComplaintOfficesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllComplaintOfficesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllComplaintOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
