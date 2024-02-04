import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-doc-file-type',
  templateUrl: './edit-doc-file-type.component.html',
  styleUrls: ['./edit-doc-file-type.component.sass'],
})
export class EditDocFileTypeComponent {
  editUploadDocumentForm: FormGroup;
  formdata = {
    ud_dc_id: '1',
    ud_title: 'ABC Document',
    ud_url: 'http://117:211:126:13:8082/abc',
    ud_course_id: '1',
    ud_class_id: '1',
    ud_department_id: '2',
    ud_remark: 'Remark Here',
    ud_attachment: '',
  };

  constructor(private fb: FormBuilder) {
    this.editUploadDocumentForm = this.createEditUploadDocumentForm();
  }

  onSubmit() {
    // console.log('Form Value', this.editUploadDocumentForm.value);
  }

  createEditUploadDocumentForm(): FormGroup {
    return this.fb.group({
      ud_dc_id: [this.formdata.ud_dc_id, [Validators.required]], //, Validators.pattern('[a-zA-Z]+')
      ud_title: [this.formdata.ud_title, [Validators.required]],
      ud_url: [this.formdata.ud_url],
      // ud_subject_id: ['', [Validators.required]],
      ud_course_id: [this.formdata.ud_course_id, [Validators.required]],
      ud_class_id: [this.formdata.ud_class_id, [Validators.required]],
      ud_department_id: [this.formdata.ud_department_id, [Validators.required]],
      ud_remark: [this.formdata.ud_remark],
      ud_attachment: [this.formdata.ud_attachment],
    });
  }
}
