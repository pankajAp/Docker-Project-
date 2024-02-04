import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddActionComponent} from './add-action.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddActionComponent;
  let fixture: ComponentFixture<AddActionComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddActionComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
