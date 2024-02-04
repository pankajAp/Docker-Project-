import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddDocMaterialStatusComponent} from './add-doc-material-status.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddDocMaterialStatusComponent;
  let fixture: ComponentFixture<AddDocMaterialStatusComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocMaterialStatusComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocMaterialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
