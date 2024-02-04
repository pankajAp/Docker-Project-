import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddDocDtInstituteTemplateComponent} from './add-doc-dt-institute-template.component';

describe('AddTimetableRescheduleComponent', () => {
  let component: AddDocDtInstituteTemplateComponent;
  let fixture: ComponentFixture<AddDocDtInstituteTemplateComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocDtInstituteTemplateComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocDtInstituteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
