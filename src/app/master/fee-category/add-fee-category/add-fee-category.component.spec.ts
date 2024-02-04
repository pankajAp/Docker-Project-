import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddFeeCategoryComponent} from './add-fee-category.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddFeeCategoryComponent;
  let fixture: ComponentFixture<AddFeeCategoryComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeeCategoryComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
