import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-user-role-action',
  templateUrl: './edit-user-role-action.component.html',
  styleUrls: ['./edit-user-role-action.component.sass'],
})
export class EditUserRoleActionComponent {
  editUserRoleActionForm: FormGroup;
  formdata = {
    actionName: 'UserRole Action',
    roleId: '1',
    actionId: '1'
    // timetable_batch_id: '1',
    // timetable_course_id: '1',
    // timetable_class_id: '1',
    // timetable_remark: 'Remark Here',
  };

  constructor(private fb: FormBuilder) {
    this.editUserRoleActionForm = this.createEditUserRoleActionForm();
  }

  onSubmit() {
    console.log('Form Value', this.editUserRoleActionForm.value);
  }

  createEditUserRoleActionForm(): FormGroup {
    return this.fb.group({

      roleId: [this.formdata.roleId, [Validators.required]],
      actionId: [this.formdata.actionId,],


      // timetable_batch_id: [this.formdata.timetable_batch_id],
      // timetable_course_id: [this.formdata.timetable_course_id, [Validators.required]],
      // timetable_class_id: [this.formdata.timetable_class_id, [Validators.required]],
      // timetable_remark: [this.formdata.timetable_remark],
    });
  }
}
