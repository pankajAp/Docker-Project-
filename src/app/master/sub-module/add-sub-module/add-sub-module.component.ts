import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";

@Component({
  selector: 'app-add-module',
  templateUrl: './add-sub-module.component.html',
  styleUrls: ['./add-sub-module.component.sass']
})
export class AddSubModuleComponent {
  subModuleForm: FormGroup;
  mstModuleDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.subModuleForm = this.fb.group({
      smModuleId: this.fb.group({
        moduleId: ['', Validators.required]
      }),
      smName: ['', [Validators.required]],
    });
    this.getMstModuleDropdown();
  }

  getMstModuleDropdown() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_module/all', request).subscribe(resp => {
      console.log(resp);
      this.mstModuleDropdownList = resp.content;
    });
  }

  onSubmit() {
    let data = this.subModuleForm.value;
    // console.log("Sub Module FORM " + "< == >" + data);
    this.api.add('mst_sub_module', data).subscribe(resp => {
      // console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Sub Module already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Sub Module Added Successfully.", "Success");
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
