import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllDocMaterialStatusComponent} from './all-doc-material-status.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllDocMaterialStatusComponent;
  let fixture: ComponentFixture<AllDocMaterialStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDocMaterialStatusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDocMaterialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
