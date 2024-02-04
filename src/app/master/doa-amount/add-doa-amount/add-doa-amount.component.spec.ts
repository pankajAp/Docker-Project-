import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddDoaAmountComponent} from './add-doa-amount.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddDoaAmountComponent;
  let fixture: ComponentFixture<AddDoaAmountComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddDoaAmountComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoaAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
