import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-semester',
  templateUrl: './edit-helpdesk-query.component.html',
  styleUrls: ['./edit-helpdesk-query.component.sass'],
})
export class EditHelpdeskQueryComponent {
  editSemesterForm: FormGroup;
  formdata = {
    semesterName: 'Semester',
    // timetable_batch_id: '1',
    // timetable_course_id: '1',
    // timetable_class_id: '1',
    // timetable_remark: 'Remark Here',
  };
  constructor(private fb: FormBuilder) {
    this.editSemesterForm = this.createEditSemesterForm();
  }
  onSubmit() {
    console.log('Form Value', this.editSemesterForm.value);
  }
  createEditSemesterForm(): FormGroup {
    return this.fb.group({
      semesterName: [
        this.formdata.semesterName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
