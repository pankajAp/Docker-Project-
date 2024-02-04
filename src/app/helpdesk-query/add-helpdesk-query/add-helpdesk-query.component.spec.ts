import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddHelpdeskQueryComponent } from './add-helpdesk-query.component';
describe('AddMaintenanceComplaintItemComponent', () => {
  let component: AddHelpdeskQueryComponent;
  let fixture: ComponentFixture<AddHelpdeskQueryComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddHelpdeskQueryComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddHelpdeskQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
