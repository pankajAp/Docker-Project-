import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllDocFilesComponent} from './all-doc-files.component';

describe('AllComplaintBuildingsComponent', () => {
  let component: AllDocFilesComponent;
  let fixture: ComponentFixture<AllDocFilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDocFilesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDocFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
