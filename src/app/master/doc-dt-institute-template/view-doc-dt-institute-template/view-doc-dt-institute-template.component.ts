import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {ActivatedRoute, Router} from "@angular/router";
import {InSubject} from 'src/app/sharing/model/in-subject';
import {EmpEmployee} from 'src/app/sharing/model/emp-employee';
import {NotificationService} from 'src/app/notification.service';

@Component({
  selector: 'app-view-online-exam',
  templateUrl: './view-doc-dt-institute-template.component.html',
  styleUrls: ['./view-doc-dt-institute-template.component.sass']
})
export class ViewDocDtInstituteTemplateComponent implements OnInit {
  editOnlineExamForm: FormGroup;
  docDtInstituteTemplateData: Array<any> = [];
  public newAttribute: any = {};
  inCourseDropdownList: InCourse[];
  inClassDropdownList: InClass[];
  inSubjectDropdownList: InSubject[];
  empEmployeeDropdownList: EmpEmployee[];
  public fieldArray: Array<any> = [];
  formatedFromTime: any;
  formatedTillTime: any;
  assignmentsData: Array<any> = [];
  formatedReleaseTime: any;
  formdata = {};

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private api: globalService,
              private notifyService: NotificationService,
              private location: Location,
              private router: Router,
              private datePipe: DatePipe) {
    this.getInCourseDropdown();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      // console.log(id);
      this.getOnlineExam(id);
    });
  }

  getOnlineExam(id) {
    let request = {};
    this.api.getData('mst_student_online_exam/get/' + id, request).subscribe(resp => {
      this.docDtInstituteTemplateData = resp;

      // console.log("Mst Student Online Exam Data => ", this.docDtInstituteTemplateData);
      // this.fieldArray = resp;

      for (let i = 0; i < this.docDtInstituteTemplateData.length; i++) {
        if (this.docDtInstituteTemplateData[i].questionDescription.length > 0) {
          this.fieldArray.push({
            'questionDescription': this.docDtInstituteTemplateData[i].questionDescription,
            'markQuestion': this.docDtInstituteTemplateData[i].markQuestion,
            'ansType': this.docDtInstituteTemplateData[i].ansType,
            'ansFirst': this.docDtInstituteTemplateData[i].ansFirst,
            'ansSecond': this.docDtInstituteTemplateData[i].ansSecond,
            'ansThree': this.docDtInstituteTemplateData[i].ansThree,
            'ansFour': this.docDtInstituteTemplateData[i].ansFour,
            'isCorrectAns1': this.docDtInstituteTemplateData[i].isCorrectAns1,
            'isCorrectAns2': this.docDtInstituteTemplateData[i].isCorrectAns2,
            'isCorrectAns3': this.docDtInstituteTemplateData[i].isCorrectAns3,
            'isCorrectAns4': this.docDtInstituteTemplateData[i].isCorrectAns4,
          })
        }
      }

      // console.log("Field Array Response => ", this.fieldArray);
      this.getInClassDropdown(resp[0].courseId);
      this.editOnlineExamForm.patchValue({
        onlieExamId: resp[0].onlieExamId,
        examDescription: resp[0].examDescription,
        examDate: resp[0].examDate,
        examStartTime: resp[0].examStartTime,
        examEndTime: resp[0].examEndTime,
        courseId: resp[0].courseId,
        classId: resp[0].classId,
        mstSubjectId: {
          subjectId: resp[0].subjectId
        }
      });
      // console.log("Response qaTsId => ", resp[0].qaTsId);
    });
  }

  getInCourseDropdown() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    let userInstituteId = userDetails.userInstituteId;
    let request = {
      query: ""
    };
    // console.log("getInCourseDropdown called");
    this.api.dropdown('course/all/' + userInstituteId, request).subscribe(resp => {
      this.inCourseDropdownList = resp;
    });
  }

  getInClassDropdown(event) {
    let request = {
      query: "",
      course_id: event
    };
    this.api.dropdown('class/all/' + event, request).subscribe(resp => {
      this.inClassDropdownList = resp;
      this.getInSubjectDropdown(event);
    });
  }

  getInSubjectDropdown(courseId) {
    let request = {
      query: ""
    };
    this.api.dropdown('subject/course-wise/' + courseId, request).subscribe(resp => {
      this.inSubjectDropdownList = resp;
    });
  }

  getEmpEmployeeDropdown(courseId) {
    let request = {
      query: "",
      type_name: "Teaching"
    };
    this.api.dropdown('employee/allByCourseId/' + courseId, request).subscribe(resp => {

      this.empEmployeeDropdownList = resp;
    });
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  onPrint(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }

  goBack() {
    this.location.back();
  }
}
