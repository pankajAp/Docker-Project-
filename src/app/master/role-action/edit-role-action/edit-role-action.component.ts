import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-role-action',
  templateUrl: './edit-role-action.component.html',
  styleUrls: ['./edit-role-action.component.sass'],
})
export class EditRoleActionComponent {
  editRoleActionForm: FormGroup;
  formdata = {
    actionName: 'Role Action',
    roleId: '1',
    actionId: '1'
    // timetable_batch_id: '1',
    // timetable_course_id: '1',
    // timetable_class_id: '1',
    // timetable_remark: 'Remark Here',
  };

  constructor(private fb: FormBuilder) {
    this.editRoleActionForm = this.createEditRoleActionForm();
  }

  onSubmit() {
    console.log('Form Value', this.editRoleActionForm.value);
  }

  createEditRoleActionForm(): FormGroup {
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
