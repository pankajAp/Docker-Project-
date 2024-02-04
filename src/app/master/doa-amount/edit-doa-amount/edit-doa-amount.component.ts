import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-doa-amount',
  templateUrl: './edit-doa-amount.component.html',
  styleUrls: ['./edit-doa-amount.component.sass'],
})
export class EditDoaAmountComponent {
  editActionForm: FormGroup;
  formdata = {
    daName: 'DOA Amount',
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
        this.formdata.daName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
