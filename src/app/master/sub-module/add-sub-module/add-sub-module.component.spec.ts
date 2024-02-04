import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AddSubModuleComponent} from './add-sub-module.component';

describe('AddComplaintBuildingComponent', () => {
  let component: AddSubModuleComponent;
  let fixture: ComponentFixture<AddSubModuleComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubModuleComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
