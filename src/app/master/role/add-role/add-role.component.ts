import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";
import {Globalpath} from 'src/app/sharing/globalpath';
import {RolesService} from '../all-roles/roles.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.sass']
})
export class AddRoleComponent {
  roleForm: FormGroup;
  inCourseDropdownList: InCourse[];
  inClassDropdownList: InClass[];
  inBatchDropdownList: InBatch[];

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required]], // , Validators.pattern('[a-zA-Z]+')
      // timetableBatchId: ['', [Validators.required]],
      // timetableCourseId: ['', [Validators.required]],
      // timetableClassId: ['', [Validators.required]],
      // timetableFrom: ['', [Validators.required]],
      // timetableTill: ['', [Validators.required]],
      // timetableRemark: ['']
    });
    // this.getInCourseDropdown();
  }

  onSubmit() {

    console.log("Role FORM +>", this.roleForm.value);
    // let data: any = {
    //   timetableBatchId: 10,
    //   timetableClassId: 13,
    //   timetableCourseId: 4,
    //   timetableName: "xcv456",
    //   timetableRemark: "xcv456"
    // }
    // var timetableFrom = this.datePipe.transform(this.timetableForm.controls['timetableFrom'].value, 'yyyy-MM-dd');
    // this.timetableForm.controls['timetableFrom'].setValue(timetableFrom);
    // var timetableTill = this.datePipe.transform(this.timetableForm.controls['timetableTill'].value, 'yyyy-MM-dd');
    // this.timetableForm.controls['timetableTill'].setValue(timetableTill);
    let data = this.roleForm.value;
    // console.log("ROLE FORM DATA " +"< == >"+ data);
    this.api.add('mst_role', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.success);
      if (resp == "Duplicate") {
        this.notifyService.showError("Role already defined.", "Error");
      } else if (resp.success) {
        this.notifyService.showSuccess("Role Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  // getInCourseDropdown() {
  //   let request = {
  //     query: ""
  //   }
  //   // console.log("getInCourseDropdown called");
  //   this.api.dropdown('course/all', request).subscribe(resp => {
  //     console.log(resp);
  //     this.inCourseDropdownList = resp;
  //   });
  // }
  // getInClassDropdown(event) {
  //   let request= {
  //     query: "",
  //     course_id: event
  //   }
  //   console.log("Course Id => ", event);
  //   this.api.dropdown('class/all/' + event, event).subscribe(resp => {
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

  abc(val) {
    console.log("called abc", val);
  }

  goBack() {
    this.location.back();
  }
}
