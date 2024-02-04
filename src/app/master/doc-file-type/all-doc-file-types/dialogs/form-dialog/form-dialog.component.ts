import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {globalService} from 'src/app/sharing/global.service';
import {Location} from "@angular/common";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {formatDate} from '@angular/common';
import {DocFileTypesService} from "../../doc-file-types.service";
import {DocFileTypes} from "../../doc-file-types.model";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {NotificationService} from "../../../../../notification.service";
import {GlobalFile} from "../../../../../globalfile";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent implements OnInit {
  exampleDatabase: DocFileTypesService | null;
  dftId: number;
  action: string;
  dialogTitle: string;
  editDocFileTypeForm: FormGroup;
  docFileType: DocFileTypes;
  inClassDropdownList: Array<any>;
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings;
  selected: any;
  allListByUdId: Array<any> = [];
  fileTypeSelected: Array<any> = [];
  fileTypeArray: Array<any> = [];
  docTypeArray: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mstDocFileDropdownList: Array<any> = [];
  mstCorrespondenceDropdownList: Array<any> = [];
  orgInstituteDropdownList: Array<any> = [];
  mstDocTypeDropdownList: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private location: Location,
    private api: globalService,
    public uploadDocumentService: DocFileTypesService,
    private notifyService: NotificationService,
    private router: Router,
    private globalFile: GlobalFile
  ) {
    // Set the defaults
    this.action = data.action;
    this.getMstCorrespondenceDropdown();
    this.getMstDocFileDropdown();
    this.getMstDocTypeDropdown();
    this.getOrgInstituteDropdown();

    console.log("Edit data is ", data);
    if (this.action === 'edit') {
      this.dialogTitle = data.docFileType.instituteName;
      this.docFileType = data.docFileType;
      this.docTypeArray = this.docFileType.dftDtId;

      for (let docType of this.docTypeArray) {
        this.fileTypeArray.push({
          'dtId': docType.dtId,
          'dtName': docType.dtName
        });
      }
      this.fileTypeArray.forEach(element => {
        this.fileTypeSelected.push(element);
      });
      this.selectedItems = this.fileTypeSelected;
      console.log("this.selectedItems ", this.selectedItems);
    } else {
      this.dialogTitle = 'New Upload Documents';
      this.docFileType = new DocFileTypes({});
    }
    this.editDocFileTypeForm = this.createEditDocFileTypeForm();
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

  ngOnInit() {
    // let request = {};
    // this.api.dropdown('uploaddocument/byUdId/' + this.docFileType.dftId, request).subscribe(resp => {
    //   this.allListByUdId = resp;
    // });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'dtId',
      textField: 'dtName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    // console.log(item);
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

  createEditDocFileTypeForm(): FormGroup {
    return this.fb.group({
      dftId: [this.docFileType.dftId],
      dftDfId: this.fb.group({
        dfId: [this.docFileType.dftDfId["dfId"], [Validators.required]],
      }),
      dftInstituteId: this.fb.group({
        instituteId: [this.docFileType.dftInstituteId["instituteId"], [Validators.required]],
      }),
      dftCorrespondenceId: this.fb.group({
        correspondenceId: [this.docFileType.dftCorrespondenceId["correspondenceId"], [Validators.required]],
      }),
      dftDtId: ['', [Validators.required]],
      updatedBy: [''],
      updatedDate: [''],
    });
  }

  submit() {
    let data = this.editDocFileTypeForm.value;
    this.api.add('mst_doc_file_type', data).subscribe(resp => {
      if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['master/doc-file-type/all-doc-file-types']);
        });
      } else {
        this.notifyService.showError("Record Failed to Add.", "Error");
        // console.log("Record Added Failed");
      }
    });
  }

  goBack() {
    this.location.back();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.uploadDocumentService.addDocFileTypes(this.editDocFileTypeForm.getRawValue());
  }


  getDocFileAndDocType(event: any) {
    console.log("event.target.value => ", event);
    this.selectedItems = [];
    this.getMstDocFileByCorrespondenceIdDropdown(event.value);
    this.getMstDocTypeByCorrespondenceIdDropdown(event.value);
  }

  getMstDocFileByCorrespondenceIdDropdown(correspondenceId: any) {
    const request = {
      query: ""
    };
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_doc_file/allByCorrespondenceId?correspondenceId=' + correspondenceId, request).subscribe(resp => {
      console.log('mstDocFileDropdownList', resp);
      this.mstDocFileDropdownList = resp.content;
    });
  }

  getMstDocTypeByCorrespondenceIdDropdown(correspondenceId: any) {
    const request = {
      query: ""
    };
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_doc_type/allByCorrespondenceId?correspondenceId=' + correspondenceId, request).subscribe(resp => {
      console.log(resp);
      this.mstDocTypeDropdownList = resp.content;
    });
  }
  getMstDocFileDropdown() {
    const request = {
      query: ""
    };
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_doc_file/all', request).subscribe(resp => {
      console.log('mstDocFileDropdownList', resp);
      this.mstDocFileDropdownList = resp.content;
    });
  }

  getMstDocTypeDropdown() {
    const request = {
      query: ""
    };
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_doc_type/all', request).subscribe(resp => {
      console.log(resp);
      this.mstDocTypeDropdownList = resp.content;
    });
  }

  getOrgInstituteDropdown() {
    const request = {
      query: ""
    };
    // console.log("getInCourseDropdown called");
    this.api.dropdown('institute/all', request).subscribe(resp => {
      console.log(resp);
      this.orgInstituteDropdownList = resp;
    });
  }

  getMstCorrespondenceDropdown() {
    const request = {
      query: ""
    };
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_correspondence/all', request).subscribe(resp => {
      console.log('mstCorrespondenceDropdownList', resp);
      this.mstCorrespondenceDropdownList = resp.content;
    });
  }
}
