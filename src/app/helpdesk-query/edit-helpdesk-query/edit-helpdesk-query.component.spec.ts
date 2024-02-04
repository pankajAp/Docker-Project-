import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditHelpdeskQueryComponent } from './edit-helpdesk-query.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditHelpdeskQueryComponent;
  let fixture: ComponentFixture<EditHelpdeskQueryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHelpdeskQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHelpdeskQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
