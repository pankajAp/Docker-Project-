import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditDocDtInstituteTemplateComponent} from './edit-doc-dt-institute-template.component';

describe('EditMasterTimetableComponent', () => {
  let component: EditDocDtInstituteTemplateComponent;
  let fixture: ComponentFixture<EditDocDtInstituteTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocDtInstituteTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocDtInstituteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
