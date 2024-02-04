import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssigneeHelpdeskQuerysComponent } from './assignee-helpdesk-querys.component';

describe('AllMaintenanceComplaintItemsComponent', () => {
  let component: AssigneeHelpdeskQuerysComponent;
  let fixture: ComponentFixture<AssigneeHelpdeskQuerysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigneeHelpdeskQuerysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneeHelpdeskQuerysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
