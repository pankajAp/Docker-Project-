import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllDocTypesComponent} from './all-doc-types.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllDocTypesComponent;
  let fixture: ComponentFixture<AllDocTypesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDocTypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDocTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
