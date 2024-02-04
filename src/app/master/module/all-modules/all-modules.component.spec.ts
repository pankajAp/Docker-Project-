import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllModulesComponent} from './all-modules.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllModulesComponent;
  let fixture: ComponentFixture<AllModulesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllModulesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
