import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditComplaintBuildingComponent} from './edit-complaint-building.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditComplaintBuildingComponent;
  let fixture: ComponentFixture<EditComplaintBuildingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditComplaintBuildingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplaintBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
