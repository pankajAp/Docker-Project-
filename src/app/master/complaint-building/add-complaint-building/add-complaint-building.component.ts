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
  templateUrl: './add-complaint-building.component.html',
  styleUrls: ['./add-complaint-building.component.sass']
})
export class AddComplaintBuildingComponent {
  cbForm: FormGroup;
  // inCourseDropdownList: InCourse[];
  // inClassDropdownList: InClass[];
  // inBatchDropdownList: InBatch[];
  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.cbForm = this.fb.group({
      cbName: ['', [Validators.required]],

      cbCode: ['',],
    });
  }

  onSubmit() {
    console.log("CB FORM +> ", this.cbForm.value);
    let data = this.cbForm.value;
    this.api.add('mst_complaint_building', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Complaint Building already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Complaint Building Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  abc(val) {
    console.log("called abc", val);
  }

  goBack() {
    this.location.back();
  }
}
