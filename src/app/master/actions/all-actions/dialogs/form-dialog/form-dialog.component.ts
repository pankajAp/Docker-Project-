import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {formatDate} from '@angular/common';
import {ActionsService} from "../../actions.service";
import {Actions} from "../../actions.model";
import {globalService} from "../../../../../sharing/global.service";
import {InCourse} from "../../../../../sharing/model/in-course";
import {InClass} from "../../../../../sharing/model/in-class";
import {InBatch} from "../../../../../sharing/model/in-batch";
import {NotificationService} from "../../../../../notification.service";
import {Location} from '@angular/common';
import {ExampleDataSource} from "../../all-actions.component";
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
  editActionForm: FormGroup;
  actions: Actions;
  inCourseDropdownList: InCourse;
  inClassDropdownList: InClass;
  inBatchDropdownList: InBatch;
  exampleDatabase: ActionsService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public actionsService: ActionsService,
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
      this.dialogTitle = data.actions.name;
      this.actions = data.actions;
    } else {
      this.dialogTitle = 'New Actions';
      this.actions = new Actions({});
    }
    this.editActionForm = this.createEditActionForm();
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

  createEditActionForm(): FormGroup {
    console.log("Action Details ==> ", this.actions);
    // this.getInClassDropdown(this.actions.timetableCourseId);
    // this.getInBatchDropdown(this.actions.timetableCourseId);
    return this.fb.group({
      actionId: [this.actions.actionId],
      actionName: [this.actions.actionName, [Validators.required]],
      actionDescription: [this.actions.actionDescription,],
      // timetableCourseId: [this.actions.timetableCourseId, [Validators.required]],
      // timetableClassId: [this.actions.timetableClassId, [Validators.required]],
      // timetableFrom: [this.actions.timetableFrom, [Validators.required]],
      // timetableTill: [this.actions.timetableTill, [Validators.required]],
      // timetableRemark: [this.actions.timetableRemark],
    });
  }

  submit() {
    // console.log("Form Submitted");
    let data = this.editActionForm.value;
    // console.log(data);
    this.api.add('mst_action', data).subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['master/action/all-actions']);
        });
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
        console.log("Record Added Failed");
      }
    });
  }

  // getInCourseDropdown() {
  //   let request = {
  //     query: ""
  //   }
  //   // console.log("getInCourseDropdown called");
  //   this.api.dropdown('course/all', request).subscribe(resp => {
  //     this.inCourseDropdownList = resp;
  //   });
  // }
  // getInClassDropdown(event) {
  //   let request= {
  //     query: "",
  //     course_id: event
  //   }
  //   this.api.dropdown('class/all/' + event, request).subscribe(resp => {
  //     this.inClassDropdownList = resp;
  //   });
  // }
  // getInBatchDropdown(event) {
  //   let request = {
  //     query: "",
  //     course_id: event
  //   }
  //   this.api.dropdown('batch/all/' + event, request).subscribe(resp => {
  //     this.inBatchDropdownList = resp;
  //   });
  // }
  callFunction() {
    console.log("callFunction called");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.actionsService.addActions(this.editActionForm.getRawValue());
  }

  // public loadData() {
  //   this.exampleDatabase = new MasterRolesService(this.httpClient);
  //   this.dataSource = new ExampleDataSource(
  //     this.exampleDatabase,
  //     this.paginator,
  //     this.sort
  //   );
  //   // console.log(this.dataSource);
  //   // fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
  //   //   if (!this.dataSource) {
  //   //     return;
  //   //   }
  //   //   this.dataSource.filter = this.filter.nativeElement.value;
  //   // });
  // }
  goBack() {
    this.location.back();
  }
}

// export class ExampleDataSource extends DataSource<Timetables> {
//   filterChange = new BehaviorSubject('');
//   get filter(): string {
//     return this.filterChange.value;
//   }
//   set filter(filter: string) {
//     this.filterChange.next(filter);
//   }
//   filteredData: Timetables[] = [];
//   renderedData: Timetables[] = [];
//   constructor(
//     public exampleDatabase: MasterTimetablesService,
//     public paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
//   }
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<Timetables[]> {
//     const displayDataChanges = [
//       this.exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this.filterChange,
//       this.paginator.page,
//     ];
//     this.exampleDatabase.getAllTimetabless();
//     return merge(...displayDataChanges).pipe(
//       map(() => {
//         // Filter data
//         this.filteredData = this.exampleDatabase.data
//           .slice()
//           .filter((timetables: Timetables) => {
//             const searchStr = (
//               timetables.timetable_name +
//               timetables.batch_name +
//               timetables.course_name +
//               timetables.class_name +
//               timetables.timetable_from_date +
//               timetables.timetable_till_date +
//               timetables.timetable_remark
//             ).toLowerCase();
//             return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//           });
//         // Sort filtered data
//         const sortedData = this.sortData(this.filteredData.slice());
//         // Grab the page's slice of the filtered sorted data.
//         const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//         this.renderedData = sortedData.splice(
//           startIndex,
//           this.paginator.pageSize
//         );
//         return this.renderedData;
//       })
//     );
//   }
//   disconnect() {}
//   /** Returns a sorted copy of the database data. */
//   sortData(data: Timetables[]): Timetables[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';
//       switch (this._sort.active) {
//         case 'timetable_id':
//           [propertyA, propertyB] = [a.timetable_id, b.timetable_id];
//           break;
//         case 'timetable_name':
//           [propertyA, propertyB] = [a.timetable_name, b.timetable_name];
//           break;
//         case 'batch_name':
//           [propertyA, propertyB] = [a.batch_name, b.batch_name];
//           break;
//         case 'course_name':
//           [propertyA, propertyB] = [a.course_name, b.course_name];
//           break;
//         case 'class_name':
//           [propertyA, propertyB] = [a.class_name, b.class_name];
//           break;
//         case 'timetable_from_date':
//           [propertyA, propertyB] = [a.timetable_from_date, b.timetable_from_date];
//           break;
//         case 'timetable_till_date':
//           [propertyA, propertyB] = [a.timetable_till_date, b.timetable_till_date];
//           break;
//         case 'timetable_remark':
//           [propertyA, propertyB] = [a.timetable_remark, b.timetable_remark];
//           break;
//       }
//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
//       return (
//         (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
//       );
//     });
//   }
// }
