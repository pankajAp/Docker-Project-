import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-complaint-building.component.html',
  styleUrls: ['./edit-complaint-building.component.sass'],
})
export class EditComplaintBuildingComponent {
  editComplaintBuildingForm: FormGroup;
  formdata = {
    cbName: 'Action',
    // timetable_batch_id: '1',
    // timetable_course_id: '1',
    // timetable_class_id: '1',
    // timetable_remark: 'Remark Here',
  };

  constructor(private fb: FormBuilder) {
    this.editComplaintBuildingForm = this.createEditComplaintBuildingForm();
  }

  onSubmit() {
    console.log('Form Value', this.editComplaintBuildingForm.value);
  }

  createEditComplaintBuildingForm(): FormGroup {
    return this.fb.group({
      cbName: [
        this.formdata.cbName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ]
    });
  }
}
