import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe, Location} from '@angular/common';

import {NotificationService} from "../../../notification.service";
import {globalService} from "../../../sharing/global.service";

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.sass']
})
export class AddStaffComponent {
  staffForm: FormGroup;

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.staffForm = this.fb.group({
      staffName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let data = this.staffForm.value;
    // console.log("Module FORM " + "< == >" + data);
    this.api.add('mst_staff', data).subscribe(resp => {
      // console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Module already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Module Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
