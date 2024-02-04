import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllDocDtInstituteTemplatesComponent} from './all-doc-dt-institute-templates.component';

describe('AllTimetableReschedulesComponent', () => {
  let component: AllDocDtInstituteTemplatesComponent;
  let fixture: ComponentFixture<AllDocDtInstituteTemplatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDocDtInstituteTemplatesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDocDtInstituteTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
