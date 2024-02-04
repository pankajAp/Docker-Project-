import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {formatDate} from '@angular/common';
import {ComplaintOfficesService} from "../../complaint-offices.service";
import {ComplaintOffice} from "../../complaint-offices.model";
import {globalService} from "../../../../../sharing/global.service";
import {InCourse} from "../../../../../sharing/model/in-course";
import {InClass} from "../../../../../sharing/model/in-class";
import {InBatch} from "../../../../../sharing/model/in-batch";
import {NotificationService} from "../../../../../notification.service";
import {Location} from '@angular/common';
import {ExampleDataSource} from "../../all-complaint-offices.component";
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
  mstComplaintBuildingDropdownList: Array<any> = [];
  // timetableForm: FormGroup;
  editComplaintOfficeForm: FormGroup;
  complaintOffice: ComplaintOffice;
  exampleDatabase: ComplaintOfficesService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public complaintOfficeService: ComplaintOfficesService,
    private fb: FormBuilder,
    private api: globalService,
    private notifyService: NotificationService,
    private location: Location,
    public httpClient: HttpClient,
    private router: Router
  ) {
    // Set the defaults
    this.action = data.action;
    console.log("complaintOffice ==> " + JSON.stringify(data.complaintOffice) + " " + this.action);
    if (this.action === 'edit') {
      this.dialogTitle = data.complaintOffice.coName;
      this.complaintOffice = data.complaintOffice;
    } else {
      this.dialogTitle = 'New Actions';
      this.complaintOffice = new ComplaintOffice({});
    }
    console.log("this.complaintOffice ==> " + JSON.stringify(this.complaintOffice));
    this.editComplaintOfficeForm = this.createEditComplaintOfficeForm();
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

  createEditComplaintOfficeForm(): FormGroup {
    console.log("Edit CO Details ==> ", this.complaintOffice);
    this.getMstComplaintBuildingDropdown();
    // this.getInBatchDropdown(this.actions.timetableCourseId);
    return this.fb.group({
      coId: [this.complaintOffice.coId],
      coName: [this.complaintOffice.coName, [Validators.required]],
      coCode: [this.complaintOffice.coCode, [Validators.required]],
      coCbId: this.fb.group({
        cbId: [this.complaintOffice.coCbId, [Validators.required]],
      })
    });
  }

  submit() {
    // console.log("Form Submitted");
    let data = this.editComplaintOfficeForm.value;
    // console.log(data);
    this.api.add('mst_complaint_office', data).subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['master/complaint-office/all-complaint-offices']);
        });
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
        console.log("Record Added Failed");
      }
    });
  }

  getMstComplaintBuildingDropdown() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_complaint_building/all', request).subscribe(resp => {
      this.mstComplaintBuildingDropdownList = resp.content;
    });
  }

  callFunction() {
    console.log("callFunction called");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.complaintOfficeService.addActions(this.editComplaintOfficeForm.getRawValue());
  }

  goBack() {
    this.location.back();
  }
}
