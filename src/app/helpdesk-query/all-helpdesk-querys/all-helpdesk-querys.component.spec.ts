import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllHelpdeskQuerysComponent } from './all-helpdesk-querys.component';

describe('AllMaintenanceComplaintItemsComponent', () => {
  let component: AllHelpdeskQuerysComponent;
  let fixture: ComponentFixture<AllHelpdeskQuerysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllHelpdeskQuerysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHelpdeskQuerysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
