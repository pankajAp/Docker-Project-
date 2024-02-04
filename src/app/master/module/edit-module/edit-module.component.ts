import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.sass'],
})
export class EditModuleComponent {
  editModuleForm: FormGroup;
  formdata = {
    moduleName: 'Action'
  };

  constructor(private fb: FormBuilder) {
    this.editModuleForm = this.createEditModuleForm();
  }

  onSubmit() {
    // console.log('Form Value', this.editModuleForm.value);
  }

  createEditModuleForm(): FormGroup {
    return this.fb.group({
      moduleName: [
        this.formdata.moduleName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
