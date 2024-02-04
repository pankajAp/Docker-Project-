import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {formatDate} from '@angular/common';
import {FeeCategorysService} from "../../fee-categorys.service";
import {FeeCategories} from "../../fee-categorys.model";
import {globalService} from "../../../../../sharing/global.service";
import {InCourse} from "../../../../../sharing/model/in-course";
import {InClass} from "../../../../../sharing/model/in-class";
import {InBatch} from "../../../../../sharing/model/in-batch";
import {NotificationService} from "../../../../../notification.service";
import {Location} from '@angular/common';
import {ExampleDataSource} from "../../all-fee-categorys.component";
import {BehaviorSubject, fromEvent, merge, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataSource} from "@angular/cdk/collections";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  // timetableForm: FormGroup;
  editFeeCategoryForm: FormGroup;
  feeCategories: FeeCategories;
  exampleDatabase: FeeCategorysService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  orgInstituteDropdownList: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public actionsService: FeeCategorysService,
    private fb: FormBuilder,
    private api: globalService,
    private notifyService: NotificationService,
    private location: Location,
    public httpClient: HttpClient,
    private router: Router
  ) {
    // Set the defaults
    console.log("Data is ", data);
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.feeCategories.fcCategoryName;
      this.feeCategories = data.feeCategories;
    } else {
      this.dialogTitle = 'New Fee Categories';
      this.feeCategories = new FeeCategories({});
    }
    this.getOrgInstituteDropdown();
    this.editFeeCategoryForm = this.createEditFeeCategoryForm();
    // this.getInCourseDropdown();
    // Reset to the first page when the user changes the filter.
    // this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getOrgInstituteDropdown() {
    let request = {
      query: ""
    }
    this.api.getData('institute/all', request).subscribe(resp => {
      console.log(resp);
      this.orgInstituteDropdownList = resp;
    });
  }

  createEditFeeCategoryForm(): FormGroup {
    console.log("SD Details ==> ", this.feeCategories.fcCategoryInstituteId);
    // this.getInClassDropdown(this.actions.timetableCourseId);
    // this.getInBatchDropdown(this.actions.timetableCourseId);
    return this.fb.group({
      fcId: [this.feeCategories.fcId],
      fcCategoryInstituteId: this.fb.group({
        instituteId: [this.feeCategories.fcCategoryInstituteId['instituteId'], [Validators.required]],
      }),
      fcCategoryName: [this.feeCategories.fcCategoryName, [Validators.required]]
    });
  }

  submit() {
    // console.log("Form Submitted");
    let data = this.editFeeCategoryForm.value;
    // console.log(data);
    this.api.add('in_fee_category', data).subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['master/fee-category/all-fee-categories']);
        });
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
        console.log("Record Added Failed");
      }
    });
  }

  callFunction() {
    console.log("callFunction called");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.actionsService.addActions(this.editFeeCategoryForm.getRawValue());
  }

  goBack() {
    this.location.back();
  }
}
