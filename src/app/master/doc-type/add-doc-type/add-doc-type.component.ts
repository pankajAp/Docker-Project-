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
  templateUrl: './add-doc-type.component.html',
  styleUrls: ['./add-doc-type.component.sass']
})
export class AddDocTypeComponent {
  docTypeForm: FormGroup;
  dtSrNo: any;
  mstCorrespondenceDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.docTypeForm = this.fb.group({
      dtName: ['', [Validators.required]],
      dtPrefix: ['', [Validators.required]],
      dtSrNo: ['', [Validators.required]],
      dtCorrespondenceId: this.fb.group({
        correspondenceId: ['', [Validators.required]],
      }),
    });
    this.getMstDocTypeDetail();
    this.getMstCorrespondenceDropdown();
  }

  onSubmit() {
    console.log("docTypeForm FORM +> ", this.docTypeForm.value);
    let data = this.docTypeForm.value;
    this.api.add('mst_doc_type', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Doc Type already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Doc Type Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  getMstDocTypeDetail() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_doc_type/all', request).subscribe(resp => {
      console.log(resp);
      this.dtSrNo = String(resp['numberOfElements'] + 1).padStart(4, '0'); // '0009';
      this.docTypeForm.patchValue({ dtSrNo: this.dtSrNo});
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
