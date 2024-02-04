import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AllUploadDocuments} from './all-calendar-events-details.component';

describe('AddTimetableRescheduleComponent', () => {
  let component: AddTimetableScheduleComponent;
  let fixture: ComponentFixture<AddTimetableScheduleComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddTimetableScheduleComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimetableScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
