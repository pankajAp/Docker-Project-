import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-fee-category',
  templateUrl: './edit-fee-category.component.html',
  styleUrls: ['./edit-fee-category.component.sass'],
})
export class EditFeeCategoryComponent {
  editStudentDocumentForm: FormGroup;
  formdata = {
    sdName: 'Action'
  };

  constructor(private fb: FormBuilder) {
    this.editStudentDocumentForm = this.createEditStudentDocumentForm();
  }

  onSubmit() {
    console.log('Form Value', this.editStudentDocumentForm.value);
  }

  createEditStudentDocumentForm(): FormGroup {
    return this.fb.group({
      timetable_name: [
        this.formdata.sdName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
