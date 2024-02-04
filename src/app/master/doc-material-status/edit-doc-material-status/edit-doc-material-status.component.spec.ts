import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditDocMaterialStatusComponent} from './edit-doc-material-status.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditDocMaterialStatusComponent;
  let fixture: ComponentFixture<EditDocMaterialStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocMaterialStatusComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocMaterialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
