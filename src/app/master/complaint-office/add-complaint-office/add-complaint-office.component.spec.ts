import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddComplaintOfficeComponent} from './add-complaint-office.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddComplaintOfficeComponent;
  let fixture: ComponentFixture<AddComplaintOfficeComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddComplaintOfficeComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplaintOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
