import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-sub-module.component.html',
  styleUrls: ['./edit-sub-module.component.sass'],
})
export class EditSubModuleComponent {
  editSubModuleForm: FormGroup;
  formdata = {
    smName: 'Action'
  };

  constructor(private fb: FormBuilder) {
    this.editSubModuleForm = this.createEditModuleForm();
  }

  onSubmit() {
    // console.log('Form Value', this.editSubModuleForm.value);
  }

  createEditModuleForm(): FormGroup {
    return this.fb.group({
      smName: [
        this.formdata.smName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
