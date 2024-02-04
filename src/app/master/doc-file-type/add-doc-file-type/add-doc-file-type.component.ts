import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {Location} from '@angular/common';
import {NotificationService} from "../../../notification.service";
import {promise} from "selenium-webdriver";
import Promise = promise.Promise;
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-doc-file-type',
  templateUrl: './add-doc-file-type.component.html',
  styleUrls: ['./add-doc-file-type.component.sass']
})
export class AddDocFileTypeComponent implements OnInit {
  docFileTypeForm: FormGroup;
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings;
  selected: any;
  mstDocFileDropdownList: Array<any> = [];
  mstCorrespondenceDropdownList: Array<any> = [];
  orgInstituteDropdownList: Array<any> = [];
  mstDocTypeDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private  api: globalService,
              private  location: Location,
              private notifyService: NotificationService) {
    this.docFileTypeForm = this.fb.group({
      dftDfId: this.fb.group({
        dfId: ['', [Validators.required]],
      }),
      dftInstituteId: this.fb.group({
        instituteId: ['', [Validators.required]],
      }),
      dftCorrespondenceId: this.fb.group({
        correspondenceId: ['', [Validators.required]],
      }),
      dftDtId: ['', [Validators.required]],
      createdBy: [''],
      createdDate: [''],
    });
    this.getMstCorrespondenceDropdown();
    this.getOrgInstituteDropdown();
  }

  ngOnInit() {
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'dtId',
      textField: 'dtName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    this.selected = [{}];
  }

  onItemSelect(item: any) {
     // console.log('single item', item);
  }

  onSelectAll(items: any) {
    // console.log('all items', items);
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

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    this.docFileTypeForm.get('createdBy').setValue(user.id);
    this.docFileTypeForm.get('createdDate').setValue("2022-26-09");
    const data = this.docFileTypeForm.value;
    console.log('data', data);
    this.api.add('mst_doc_file_type', data).subscribe(resp => {
      console.log("resp is " + resp);
      if (resp) {
        this.notifyService.showSuccess("Record Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Failed to Add.", "Error");
        // console.log("Record Added Failed");
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
