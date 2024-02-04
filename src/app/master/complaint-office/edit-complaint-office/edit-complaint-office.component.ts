import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-complaint-office.component.html',
  styleUrls: ['./edit-complaint-office.component.sass'],
})
export class EditComplaintOfficeComponent {
  editActionForm: FormGroup;
  formdata = {
    actionName: 'Action',
    // timetable_batch_id: '1',
    // timetable_course_id: '1',
    // timetable_class_id: '1',
    // timetable_remark: 'Remark Here',
  };

  constructor(private fb: FormBuilder) {
    this.editActionForm = this.createEditActionForm();
  }

  onSubmit() {
    console.log('Form Value', this.editActionForm.value);
  }

  createEditActionForm(): FormGroup {
    return this.fb.group({
      timetable_name: [
        this.formdata.actionName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
