import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {NotificationService} from "../../../notification.service";
import {Actions} from '../../actions/all-actions/actions.model';
import {Roles} from '../../role/all-roles/roles.model';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {FeeCategories} from "../../fee-category/all-fee-categorys/fee-categorys.model";
import {StudentDocuments} from "../../student-document/all-student-documents/student-documents.model";

@Component({
  selector: 'app-add-role-action',
  templateUrl: './add-student-document-fee-category.component.html',
  styleUrls: ['./add-student-document-fee-category.component.sass']
})

export class AddStudentDocumentFeeCategoryComponent {
  studentDocumentFeeCategoryForm: FormGroup;
  feeCategoriesList: FeeCategories[];
  studentDocumentList: StudentDocuments[];
  studentDocumentArray: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings;
  orgInstituteDropdownList: Array<any> = [];
  inFeeCategoryDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.studentDocumentFeeCategoryForm = this.fb.group({
      sdfcInstituteId: this.fb.group({
        instituteId: ['', [Validators.required]],
      }),
      sdfcSdId: this.fb.group({
        sdId: ['', [Validators.required]],
      }),
      sdfcFcId: this.fb.group({
        fcId: ['', [Validators.required]],
      })
    });
    // this.getFeeCategoryData();
    this.getStudentDocumentData();
    this.getOrgInstituteDropdown();
  }

  // ngOnInit() {
  //   this.selectedItems = [];
  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'fcId',
  //     textField: 'actionName',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     allowSearchFilter: true
  //   };
  // }

  onSubmit() {
    for (let singleAction of this.studentDocumentArray) {
      this.studentDocumentFeeCategoryForm.controls.sdfcSdId.get("sdId").setValue(singleAction);
      console.log("Form VALUE => ", this.studentDocumentFeeCategoryForm.value);
      this.api.add('trn_student_document_fee_category', this.studentDocumentFeeCategoryForm.value).subscribe(resp => {
        console.log("Response => " + resp.message + " Response Message => " + resp.success);
        if (resp == "Duplicate") {
          this.notifyService.showError("Role Action already defined.", "Error");
        } else if (resp.success == 1) {
          this.notifyService.showSuccess("Role Action Added Successfully.", "Success");
          this.goBack();
        } else {
          this.notifyService.showError("Record Added Failed.", "Error");
        }
      });
    }
  }
  getInFeeCategoryDropdown(event: any) {
    let request = {
      query: ""
    }
    console.log("Fee Category event is ", event);
    this.api.dropdown('in_fee_category/allByInstituteId/' + event, request).subscribe(resp => {
      this.inFeeCategoryDropdownList = resp["content"];
    });
  }

  getStudentDocumentData() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.getData('mst_student_document/all', request).subscribe(resp => {
      console.log(resp);
      this.studentDocumentList = resp;
      // console.log("Action List => ", this.actionList["content"]);
      this.studentDocumentList = this.studentDocumentList["content"];
      console.log("studentDocumentList DATA => ", this.studentDocumentList);
    });
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

  onChange(sdId, isChecked) {
    if (isChecked) {
      this.studentDocumentArray.push(sdId);
    } else {
      this.studentDocumentArray = this.studentDocumentArray.filter(item => item !== sdId);
    }
    console.log(this.studentDocumentArray);
  }

  abc(val) {
    console.log("called abc", val);
  }

  goBack() {
    this.location.back();
  }
}
