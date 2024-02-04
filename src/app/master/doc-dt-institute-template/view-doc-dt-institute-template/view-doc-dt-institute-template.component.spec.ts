import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ViewDocDtInstituteTemplateComponent} from './view-doc-dt-institute-template.component';

describe('ViewDocFinancialCorrespondenceComponent', () => {
  let component: ViewDocDtInstituteTemplateComponent;
  let fixture: ComponentFixture<ViewDocDtInstituteTemplateComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocDtInstituteTemplateComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocDtInstituteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
