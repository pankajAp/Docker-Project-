import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllDoaAmountsComponent} from './all-doa-amounts.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllDoaAmountsComponent;
  let fixture: ComponentFixture<AllDoaAmountsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDoaAmountsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDoaAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
