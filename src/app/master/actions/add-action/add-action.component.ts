import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.sass']
})
export class AddActionComponent {
  actionForm: FormGroup;
  // inCourseDropdownList: InCourse[];
  // inClassDropdownList: InClass[];
  // inBatchDropdownList: InBatch[];
  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.actionForm = this.fb.group({
      actionName: ['', [Validators.required]],

      actionDescription: ['',], // , Validators.pattern('[a-zA-Z]+')
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

    console.log("Action FORM +> ", this.actionForm.value);
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
    let data = this.actionForm.value;
    console.log("ACTION FORM " + "< == >" + data);
    this.api.add('mst_action', data).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.msg);
      if (resp == "Duplicate") {
        this.notifyService.showError("Action already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Action Added Successfully.", "Success");
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
