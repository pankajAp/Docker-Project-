import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddComplaintBuildingComponent} from './add-complaint-building.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddComplaintBuildingComponent;
  let fixture: ComponentFixture<AddComplaintBuildingComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddComplaintBuildingComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplaintBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
