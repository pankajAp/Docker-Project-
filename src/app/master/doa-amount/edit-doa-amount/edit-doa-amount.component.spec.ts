import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditDoaAmountComponent} from './edit-doa-amount.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditDoaAmountComponent;
  let fixture: ComponentFixture<EditDoaAmountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditDoaAmountComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoaAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
