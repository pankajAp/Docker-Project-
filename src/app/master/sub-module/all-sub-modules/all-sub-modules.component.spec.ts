import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllSubModulesComponent} from './all-sub-modules.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllSubModulesComponent;
  let fixture: ComponentFixture<AllSubModulesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllSubModulesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
