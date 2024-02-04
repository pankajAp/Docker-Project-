import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyHelpdeskQuerysComponent } from './my-helpdesk-querys.component';

describe('AllMaintenanceComplaintItemsComponent', () => {
  let component: MyHelpdeskQuerysComponent;
  let fixture: ComponentFixture<MyHelpdeskQuerysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHelpdeskQuerysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHelpdeskQuerysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
