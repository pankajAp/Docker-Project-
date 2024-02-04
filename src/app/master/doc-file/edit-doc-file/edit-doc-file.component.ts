import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-doc-file',
  templateUrl: './edit-doc-file.component.html',
  styleUrls: ['./edit-doc-file.component.sass'],
})
export class EditDocFileComponent {
  editDocFileForm: FormGroup;
  formdata = {
    actionName: 'Action',
    // timetable_batch_id: '1',
    // timetable_course_id: '1',
    // timetable_class_id: '1',
    // timetable_remark: 'Remark Here',
  };

  constructor(private fb: FormBuilder) {
    this.editDocFileForm = this.createEditActionForm();
  }

  onSubmit() {
    console.log('Form Value', this.editDocFileForm.value);
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
