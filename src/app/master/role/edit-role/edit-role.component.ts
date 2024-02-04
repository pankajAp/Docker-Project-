import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.sass'],
})
export class EditRoleComponent {
  editRoleForm: FormGroup;
  formdata = {
    roleName: 'Role',
    // timetable_batch_id: '1',
    // timetable_course_id: '1',
    // timetable_class_id: '1',
    // timetable_remark: 'Remark Here',
  };

  constructor(private fb: FormBuilder) {
    this.editRoleForm = this.createEditRoleForm();
  }

  onSubmit() {
    console.log('Form Value', this.editRoleForm.value);
  }

  createEditRoleForm(): FormGroup {
    return this.fb.group({
      roleName: [
        this.formdata.roleName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
