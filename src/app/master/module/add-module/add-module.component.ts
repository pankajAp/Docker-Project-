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
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.sass']
})
export class AddModuleComponent {
  moduleForm: FormGroup;

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.moduleForm = this.fb.group({
      moduleName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let data = this.moduleForm.value;
    // console.log("Module FORM " + "< == >" + data);
    this.api.add('mst_module', data).subscribe(resp => {
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
