import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {StudentDocumentFeeCategorysService} from "../../student-document-fee-categorys.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentDocumentFeeCategoryService: StudentDocumentFeeCategorysService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.studentDocumentFeeCategoryService.deleteStudentDocumentFeeCategory(this.data.sdfcId);
  }
}
