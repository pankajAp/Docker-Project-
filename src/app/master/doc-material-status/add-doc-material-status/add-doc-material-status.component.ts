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
  templateUrl: './add-doc-material-status.component.html',
  styleUrls: ['./add-doc-material-status.component.sass']
})
export class AddDocMaterialStatusComponent {

  docMaterialStatusForm: FormGroup;

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.docMaterialStatusForm = this.fb.group({
      dmsName: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let data = this.docMaterialStatusForm.value;
    this.api.add('mst_doc_material_status', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Material Status already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Material Status Added Successfully.", "Success");
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
