import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";

@Component({
  selector: 'app-add-action',
  templateUrl: './add-complaint-office.component.html',
  styleUrls: ['./add-complaint-office.component.sass']
})
export class AddComplaintOfficeComponent {
  coForm: FormGroup;
  mstComplaintBuildingDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.coForm = this.fb.group({
      coName: ['', [Validators.required]],
      coCode: [''],
      coCbId: this.fb.group({
        cbId: ['', [Validators.required]],
      }),
    });
    this.getMstComplaintBuildingDropdown();
  }

  onSubmit() {
    console.log("CO FORM +> ", this.coForm.value);
    let data = this.coForm.value;
    this.api.add('mst_complaint_office', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Complaint Office/Room already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Complaint Office/Room Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  getMstComplaintBuildingDropdown() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_complaint_building/all', request).subscribe(resp => {
      console.log(resp);
      this.mstComplaintBuildingDropdownList = resp.content;
    });
  }

  abc(val) {
    console.log("called abc", val);
  }

  goBack() {
    this.location.back();
  }
}
