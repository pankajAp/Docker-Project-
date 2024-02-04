import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {formatDate} from '@angular/common';
import {ModulesService} from "../../modules.service";
import {Modules} from "../../modules.model";
import {globalService} from "../../../../../sharing/global.service";
import {InCourse} from "../../../../../sharing/model/in-course";
import {InClass} from "../../../../../sharing/model/in-class";
import {InBatch} from "../../../../../sharing/model/in-batch";
import {NotificationService} from "../../../../../notification.service";
import {Location} from '@angular/common';
import {ExampleDataSource} from "../../all-modules.component";
import {BehaviorSubject, fromEvent, merge, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataSource} from "@angular/cdk/collections";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  // timetableForm: FormGroup;
  editStudentDocumentForm: FormGroup;
  modules: Modules;
  exampleDatabase: ModulesService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public actionsService: ModulesService,
    private fb: FormBuilder,
    private api: globalService,
    private notifyService: NotificationService,
    private location: Location,
    public httpClient: HttpClient,
    private router: Router
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.modules.name;
      this.modules = data.modules;
    } else {
      this.dialogTitle = 'New Modules';
      this.modules = new Modules({});
    }
    this.editStudentDocumentForm = this.createEditStudentDocumentForm();
    // this.getInCourseDropdown();
    // Reset to the first page when the user changes the filter.
    // this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createEditStudentDocumentForm(): FormGroup {
    // console.log("SD Details ==> ", this.modules);
    // this.getInClassDropdown(this.actions.timetableCourseId);
    // this.getInBatchDropdown(this.actions.timetableCourseId);
    return this.fb.group({
      moduleId: [this.modules.moduleId],
      moduleName: [this.modules.moduleName, [Validators.required]]
    });
  }

  submit() {
    // console.log("Form Submitted");
    let data = this.editStudentDocumentForm.value;
    // console.log(data);
    this.api.add('mst_module', data).subscribe(resp => {
      // console.log(resp);
      if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['master/module/all-sub-modules']);
        });
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
        // console.log("Record Added Failed");
      }
    });
  }

  callFunction() {
    // console.log("callFunction called");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.actionsService.addActions(this.editStudentDocumentForm.getRawValue());
  }

  goBack() {
    this.location.back();
  }
}
