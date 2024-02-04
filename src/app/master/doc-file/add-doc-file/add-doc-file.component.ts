import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";

@Component({
  selector: 'app-add-doc-file',
  templateUrl: './add-doc-file.component.html',
  styleUrls: ['./add-doc-file.component.sass']
})
export class AddDocFileComponent {
  docFileForm: FormGroup;
  dfSrNo: any;
  orgInstituteDropdownList: Array<any> = [];
  mstCorrespondenceDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.docFileForm = this.fb.group({
      dfNo: ['', [Validators.required]],
      dfSrNo: ['', [Validators.required]],
      dfCorrespondenceId: this.fb.group({
        correspondenceId: ['', [Validators.required]],
      }),
      dfInstituteId: this.fb.group({
        instituteId: ['', [Validators.required]],
      }),
    });
    this.getMstDocFileDetail();
    this.getOrgInstituteDropdown();
    this.getMstCorrespondenceDropdown();
  }

  onSubmit() {
    console.log("docFileForm FORM +> ", this.docFileForm.value);
    let data = this.docFileForm.value;
    this.api.add('mst_doc_file', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Doc File already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Doc File Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  getMstDocFileDetail() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_doc_file/all', request).subscribe(resp => {
      console.log(resp);
      this.dfSrNo = String(resp['numberOfElements'] + 1).padStart(4, '0'); // '0009';
      this.docFileForm.patchValue({ dfSrNo: this.dfSrNo});
    });
  }

  getOrgInstituteDropdown() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('institute/all', request).subscribe(resp => {
      console.log(resp);
      this.orgInstituteDropdownList = resp;
    });
  }

  getMstCorrespondenceDropdown() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_correspondence/all', request).subscribe(resp => {
      console.log(resp);
      this.mstCorrespondenceDropdownList = resp['content'];
    });
  }

  abc(val) {
    console.log("called abc", val);
  }

  goBack() {
    this.location.back();
  }
}
