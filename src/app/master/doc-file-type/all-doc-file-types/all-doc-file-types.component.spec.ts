import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AllDocFileTypesComponent} from './all-doc-file-types.component';

describe('AllCalendarEventDetailsComponent', () => {
  let component: AllDocFileTypesComponent;
  let fixture: ComponentFixture<AllDocFileTypesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllDocFileTypesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDocFileTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
