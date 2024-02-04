import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditFeeCategoryComponent} from './edit-fee-category.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditFeeCategoryComponent;
  let fixture: ComponentFixture<EditFeeCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeeCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
