import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {formatDate} from '@angular/common';
import {StudentDocumentFeeCategorysService} from "../../student-document-fee-categorys.service";
import {StudentDocumentFeeCategorysModel} from "../../student-document-fee-categorys.model";
import {globalService} from "../../../../../sharing/global.service";
import {InCourse} from "../../../../../sharing/model/in-course";
import {InClass} from "../../../../../sharing/model/in-class";
import {InBatch} from "../../../../../sharing/model/in-batch";
import {NotificationService} from "../../../../../notification.service";
import {Location} from '@angular/common';
import {ExampleDataSource} from "../../all-student-document-fee-categorys.component";
import {BehaviorSubject, fromEvent, merge, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataSource} from "@angular/cdk/collections";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Actions} from 'src/app/master/actions/all-actions/actions.model';
import {Roles} from 'src/app/master/role/all-roles/roles.model';
import {StudentDocuments} from "../../../../student-document/all-student-documents/student-documents.model";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  // timetableForm: FormGroup;
  editStudentDocumentFeeCategoryForm: FormGroup;
  studentDocumentFeeCategories: Array<any> = [];
  studentDocumentList: StudentDocuments[];
  revisedActionList: Array<any> = [];
  studentDocumentListByFcId: StudentDocuments[];
  feeCategoryList: Roles[];
  studentDocumentArray: Array<any> = [];
  studentDocumentFeeCategoryArray: Array<any> = [];
  isChecked = false;
  result: any;

  exampleDatabase: StudentDocumentFeeCategorysService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentDocumentService: StudentDocumentFeeCategorysService,
    private fb: FormBuilder,
    private api: globalService,
    private notifyService: NotificationService,
    private location: Location,
    public httpClient: HttpClient,
    private router: Router
  ) {
    // Set the defaults
    this.action = data.action;
    console.log("DATA IS ", data);
    if (this.action === 'edit') {
      this.dialogTitle = data.studentDocumentFeeCategories.name;
      this.studentDocumentFeeCategories = data.studentDocumentFeeCategories;
    } else {
      this.dialogTitle = 'New Student Document Fee Category';
      this.studentDocumentFeeCategories = [];
    }
    this.editStudentDocumentFeeCategoryForm = this.createEditStudentDocumentFeeCategoryForm();

    this.getFeeCategoryDropdown();
    this.getStudentDocumentListData(data.studentDocumentFeeCategories.fcId);
  }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createEditStudentDocumentFeeCategoryForm(): FormGroup {
    // console.log("RoleAction Details ==> ", this.roleActions?.raRoleId?.roleId + " <> " + this.roleActions?.raActionId.actionId);
    console.log("RoleAction Details ==> ", this.studentDocumentFeeCategories['sdfcId']);
    return this.fb.group({
      // raId: [this.roleActions['raId']],
      sdfcFcId: this.fb.group({
        fcId: [this.studentDocumentFeeCategories['fcId'], [Validators.required]],
      }),
      sdfcSdId: this.fb.group({
        sdId: [this.studentDocumentFeeCategories['sdId']]
      })
    });
  }

  getFeeCategoryDropdown() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('in_fee_category/all', request).subscribe(resp => {
      this.feeCategoryList = resp;
      // console.log("Role List => ", this.roleList["content"]);
      this.feeCategoryList = this.feeCategoryList["content"];

      console.log("Fee Category List Data => ", this.feeCategoryList);
    });
  }

  getStudentDocumentListData(fcId: any) {
    let request = {
      query: ""
    }
    this.api.getData('mst_student_document/all', request).subscribe(resp => {
      this.studentDocumentList = resp;
      this.studentDocumentList = this.studentDocumentList["content"];
      this.getStudentDocumentFeeCategoryData(fcId);
    });
  }

  getStudentDocumentFeeCategoryData(fcId: any) {
    let request = {
      fcId: fcId
    }
    this.api.getData('trn_student_document_fee_category/allBySdfcFcId/' + fcId, request).subscribe(resp => {
      this.studentDocumentListByFcId = resp;

      for (let singleAction of this.studentDocumentList) {
        const result = this.studentDocumentListByFcId.filter(f =>
          f['sdfcSdId'].sdId === singleAction.sdId
        );

        const newResult = result.map(item => item["sdfcSdId"].sdId);

        if (singleAction.sdId == newResult[0]) {

          this.studentDocumentArray.push(singleAction.sdId);

          this.studentDocumentFeeCategoryArray.push({
            'sdId': singleAction.sdId,
            'sdName': singleAction.sdName,
            'isChecked': true
          });

        } else {
          this.studentDocumentFeeCategoryArray.push({
            "sdId": singleAction.sdId,
            "sdName": singleAction.sdName,
            "isChecked": false
          });
        }
      }
      console.log("ROLE ACTION ARRAY is => ", this.studentDocumentFeeCategoryArray);
    });
  }

  submit() {
    // console.log("EDIT FORM ACTION ARRAY DATA : ", this.studentDocumentArray);
    this.deleteItem();
    for (let singleAction of this.studentDocumentArray) {
      this.editStudentDocumentFeeCategoryForm.controls.sdfcSdId.get("sdId").setValue(singleAction);
      let data = this.editStudentDocumentFeeCategoryForm.value;
      this.api.add('trn_student_document_fee_category', data).subscribe(resp => {
        if (resp) {
        } else {
          this.notifyService.showError("Record Added Failed.", "Error");
        }
      });
      this.notifyService.showSuccess("Record Updated Successfully.", "Success");
      this.dialogRef.close();
    }
    this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
      this.router.navigate(['master/student-document-fee-category/all-student-document-fee-categorys']);
    });
  }

  deleteItem() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.studentDocumentService.deleteBySdfcFcId(this.editStudentDocumentFeeCategoryForm.controls.sdfcFcId.get("fcId").value, userDetails.id);
  }

  onChange(action: string, isChecked: boolean) {
    if (isChecked) {
      this.studentDocumentArray.push(action);
    } else {
      // let index = this.studentDocumentArray.controls.findIndex(x => x.value == action)
      // this.studentDocumentArray.removeAt(index);
      const index: number = this.studentDocumentArray.indexOf(action);
      if (index !== -1) {
        this.studentDocumentArray.splice(index, 1);
      }
    }
    console.log(this.studentDocumentArray);
  }

  callFunction() {
    console.log("callFunction called");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.studentDocumentService.addRoleActions(this.editStudentDocumentFeeCategoryForm.getRawValue());
  }

  goBack() {
    this.location.back();
  }
}
