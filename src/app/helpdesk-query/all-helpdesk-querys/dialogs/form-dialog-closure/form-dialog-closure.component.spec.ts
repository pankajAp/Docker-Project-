import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormDialogClosureComponent } from './form-dialog-closure.component';

describe('FormDialogComponent', () => {
  let component: FormDialogClosureComponent;
  let fixture: ComponentFixture<FormDialogClosureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDialogClosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
