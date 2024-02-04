import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";

@Component({
  selector: 'app-add-student-document',
  templateUrl: './add-student-document.component.html',
  styleUrls: ['./add-student-document.component.sass']
})
export class AddStudentDocumentComponent {
  studentDocumentForm: FormGroup;
  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.studentDocumentForm = this.fb.group({
      sdName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let data = this.studentDocumentForm.value;
    console.log("Student Document FORM " + "< == >" + data);
    this.api.add('mst_student_document', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Student Document already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Student Document Added Successfully.", "Success");
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
