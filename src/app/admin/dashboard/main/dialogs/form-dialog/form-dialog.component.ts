import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {globalService} from 'src/app/sharing/global.service';
import {StdTimetable} from "../../../../../sharing/model/std-timetable";
import {MstDay} from "../../../../../sharing/model/mst-day";
import {InSubject} from "../../../../../sharing/model/in-subject";
import {EmpEmployee} from "../../../../../sharing/model/emp-employee";
import {DatePipe, Location} from "@angular/common";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {MainService} from "../../main.service";
import {MainModel} from "../../main.model";
import {NotificationService} from "../../../../../notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  hour1: string;
  min1: string;
  sec1: string;
  hour2: string;
  min2: string;
  sec2: string;
  editTimetableScheduleForm: FormGroup;
  timetableSchedules: MainModel;
  stdTimetableDropdownList: StdTimetable[];
  mstDayDropdownList: MstDay[];
  inSubjectDropdownList: InSubject[];
  formatedFromTime: any;
  formatedTillTime: any;
  empEmployeeDropdownList: EmpEmployee[];
  stdTimetable: any;
  inCourse: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public timetableSchedulesService: MainService,
    private fb: FormBuilder,
    private location: Location,
    private api: globalService,
    private notifyService: NotificationService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    // Set the defaults
    console.log("Abc123456 789");
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.timetableSchedules.timetableName;
      this.timetableSchedules = data.timetableSchedules;
    } else {
      this.dialogTitle = 'New Timetables';
      this.timetableSchedules = new MainModel({});
    }
    this.editTimetableScheduleForm = this.createEditTimetableScheduleForm();
    this.getStdTimetableDropdown();
    this.getMstDayDropdown();
    // this.getEmpEmployeeDropdown();

    this.editTimetableScheduleForm.controls['rtsTimetableId'].disable();
    this.editTimetableScheduleForm.controls['rtsDayId'].disable();
    this.editTimetableScheduleForm.controls['rtsFromTime'].disable();
    this.editTimetableScheduleForm.controls['rtsTillTime'].disable();
    this.editTimetableScheduleForm.controls['rtsEmployeeId'].disable();
    this.editTimetableScheduleForm.controls['rtsSubjectId'].disable();
    this.editTimetableScheduleForm.controls['rtsIsOnline'].disable();
  }

  // formControl = new FormControl('', [
  //   Validators.required,
  //   // Validators.email,
  // ]);
  //
  // getErrorMessage() {
  //   return this.formControl.hasError('required')
  //     ? 'Required field'
  //     : this.formControl.hasError('email')
  //       ? 'Not a valid email'
  //       : '';
  // }

  createEditTimetableScheduleForm(): FormGroup {
    // console.log("Timetable Schedules => ", this.timetableSchedules.tsTimetableId);
    this.getInSubjectDropdown(this.timetableSchedules.tsTimetableId);
    this.hour1 = this.timetableSchedules.tsFromTime.split(':')[0];
    this.min1 = this.timetableSchedules.tsFromTime.split(':')[1];
    this.sec1 = this.timetableSchedules.tsFromTime.split(':')[2];
    this.hour2 = this.timetableSchedules.tsTillTime.split(':')[0];
    this.min2 = this.timetableSchedules.tsTillTime.split(':')[1];
    this.sec2 = this.timetableSchedules.tsTillTime.split(':')[2];
    return this.fb.group({
      rtsTsId: [this.timetableSchedules.tsId],
      rtimetableId: [this.timetableSchedules.timetableId],
      rtimetableName: [this.timetableSchedules.timetableName, [Validators.required]],
      rtsTimetableId: [this.timetableSchedules.tsTimetableId, [Validators.required]],
      rtsDayId: [this.timetableSchedules.tsDayId, [Validators.required]],
      rtsFromTime: new FormControl(new Date(new Date().setHours(Number(this.hour1), Number(this.min1), Number(this.sec1), 0))),
      rtsTillTime: new FormControl(new Date(new Date().setHours(Number(this.hour2), Number(this.min2), Number(this.sec2), 0))),
      rtsSubjectId: [this.timetableSchedules.tsSubjectId, [Validators.required]],
      rtsIsOnline: [this.timetableSchedules.tsIsOnline, [Validators.required]],
      rtsEmployeeId: [this.timetableSchedules.tsEmployeeId],
      rtsReplaceDate: [''],
      rtsReplaceSubjectId: ['', [Validators.required]],
      rtsReplaceIsOnline: ['', [Validators.required]],
      rtsReplaceEmployeeId: ['', [Validators.required]],
      createdBy: [''],
      isDeleted: [''],
      isActive: ['']
    });
  }

  submit() {
    // console.log("Submit Called...");
    var dt = new Date();
    var rtsReplaceDate = this.datePipe.transform(dt, 'yyyy-MM-dd');
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.formatedFromTime = this.datePipe.transform(this.editTimetableScheduleForm.get('rtsFromTime').value, "HH:mm:00");
    this.formatedTillTime = this.datePipe.transform(this.editTimetableScheduleForm.get('rtsTillTime').value, "HH:mm:00");
    this.editTimetableScheduleForm.controls.rtsFromTime.setValue(this.formatedFromTime);
    this.editTimetableScheduleForm.controls.rtsTillTime.setValue(this.formatedTillTime);
    this.editTimetableScheduleForm.controls.rtsReplaceDate.setValue(rtsReplaceDate);
    this.editTimetableScheduleForm.controls.createdBy.setValue(userDetails.id);
    this.editTimetableScheduleForm.controls.isDeleted.setValue(0);
    this.editTimetableScheduleForm.controls.isActive.setValue(1);
    let data = this.editTimetableScheduleForm.value;
    console.log(data);
    this.api.addWithFullURL('timetableschedule/save/replacetimetableschedule', data).subscribe(resp => {
      if (resp) {
        this.notifyService.showSuccess("Schedule Replace Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['admin/dashboard/main']);
        });
      } else {
        this.notifyService.showError("Record Updation Failed.", "Error");
        // console.log("Record Added Failed");
      }
    });
  }

  //
  onNoClick(): void {
    this.dialogRef.close();
  }

  // public confirmAdd(): void {
  //   this.timetableSchedulesService.addTimetableSchedules(this.editTimetableScheduleForm.getRawValue());
  // }

  getStdTimetableDropdown() {
    console.log("getStdTimetableDropdown called...");
    let request = {
      query: ""
    }
    this.api.dropdown('timetable/all/', request).subscribe(resp => {
      this.stdTimetableDropdownList = resp;
    });
  }

  getMstDayDropdown() {
    let request = {
      query: ""
    }
    this.api.dropdown('day/all/', request).subscribe(resp => {
      this.mstDayDropdownList = resp;
    });
  }

  getInSubjectDropdown(event) {
    let request = {
      query: "",
      timetableId: event
    }
    this.getStdTimetable(event);
    this.api.dropdown('subject/all/' + event, request).subscribe(resp => {
      this.inSubjectDropdownList = resp;
    });
  }

  getStdTimetable(event) {
    let request = {
      query: "",
      timetable_id: event
    }
    console.log("Timetable ID => ", event);
    this.api.dropdown('timetable/get/' + event, request).subscribe(resp => {
      this.stdTimetable = resp;
      this.getInCourseDropdown(this.stdTimetable.timetableCourseId);
    });
  }

  getInCourseDropdown(courseId) {
    let request = {
      query: ""
    }
    console.log("Course ID => ", courseId);
    this.api.dropdown('course/get/' + courseId, request).subscribe(resp => {
      this.inCourse = resp;
      this.getEmpEmployeeDropdown(this.inCourse.courseInstituteId);
    });
  }

  getEmpEmployeeDropdown(instituteId) {
    let request = {
      query: "",
    }
    this.api.dropdown('employee/all/' + instituteId, request).subscribe(resp => {
      this.empEmployeeDropdownList = resp;
    });
  }

  // goBack() {
  //   this.location.back();
  // }
}
