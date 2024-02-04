import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";

@Component({
  selector: 'app-add-fee-category',
  templateUrl: './add-fee-category.component.html',
  styleUrls: ['./add-fee-category.component.sass']
})
export class AddFeeCategoryComponent {
  feeCategoryForm: FormGroup;
  orgInstituteDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.feeCategoryForm = this.fb.group({
      fcCategoryInstituteId: this.fb.group({
        instituteId: ['', [Validators.required]],
      }),
      fcCategoryName: ['', [Validators.required]]
    });
    this.getOrgInstituteDropdown();
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

  onSubmit() {
    let data = this.feeCategoryForm.value;
    console.log("feeCategoryForm " + "< == >" + data);
    this.api.add('in_fee_category', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Fee category already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Fee category Added Successfully.", "Success");
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
