import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, ViewChild} from '@angular/core';
import {globalService} from 'src/app/sharing/global.service';
import {Location} from "@angular/common";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {DocDtInstituteTemplateService} from "../../doc-dt-institute-template.service";
import {DocDtInstituteTemplateModel} from "../../doc-dt-institute-template.model";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../../notification.service";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  exampleDatabase: DocDtInstituteTemplateService | null;
  qaId: number;
  action: string;
  dialogTitle: string;
  editOnlineExamForm: FormGroup;
  docDtInstituteTemplateData: DocDtInstituteTemplateModel;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private location: Location,
    private api: globalService,
    public onlineExamService: DocDtInstituteTemplateService,
    private notifyService: NotificationService,
    private router: Router
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.docDtInstituteTemplateData.examDescription;
      this.docDtInstituteTemplateData = data.docDtInstituteTemplateData;
    } else {
      this.dialogTitle = 'New Questinnaire';
      this.docDtInstituteTemplateData = new DocDtInstituteTemplateModel({});
    }
    this.editOnlineExamForm = this.createEditOnlineExamForm();
  }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createEditOnlineExamForm(): FormGroup {
    return this.fb.group({
      dditId: [this.docDtInstituteTemplateData.dditId]
    });
  }

  submit() {
    let data = this.editOnlineExamForm.value;
    this.api.updaterecord('api/mst_student_online_exam/updateIsOnlineStudentExamStarted', data).subscribe(resp => {
      // console.log(resp);
      if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['teacher/online-exam/all-doc-financial-correspondences']);
        });
      } else {
        this.notifyService.showError("Record Updation Failed.", "Error");
        // console.log("Record Added Failed");
      }
    });
  }

  goBack() {
    this.location.back();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
