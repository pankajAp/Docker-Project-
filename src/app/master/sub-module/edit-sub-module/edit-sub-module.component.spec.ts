import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditSubModuleComponent} from './edit-sub-module.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditSubModuleComponent;
  let fixture: ComponentFixture<EditSubModuleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubModuleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
