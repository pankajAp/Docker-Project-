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
  templateUrl: './add-doa-amount.component.html',
  styleUrls: ['./add-doa-amount.component.sass']
})
export class AddDoaAmountComponent {

  doaAmountForm: FormGroup;

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.doaAmountForm = this.fb.group({
      daName: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let data = this.doaAmountForm.value;
    this.api.add('mst_doa_amount', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("DOA Amount already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("DOA Amount Added Successfully.", "Success");
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
