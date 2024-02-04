import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {globalService} from "../../../sharing/global.service";
import {NotificationService} from "../../../notification.service";
import {DatePipe, Location} from "@angular/common";
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InSubject} from 'src/app/sharing/model/in-subject';
import {EmpEmployee} from 'src/app/sharing/model/emp-employee';

@Component({
  selector: 'app-edit-doc-dt-institute-template',
  templateUrl: './edit-doc-dt-institute-template.component.html',
  styleUrls: ['./edit-doc-dt-institute-template.component.sass'],
})
export class EditDocDtInstituteTemplateComponent implements OnInit {
  editDocDtInstituteTemplateForm: FormGroup;
  docDtInstituteTemplateData: Array<any> = [];
  public fieldArray: Array<any> = [];
  public updatedFieldArray: Array<any> = [];
  public newAttribute: any = {};
  orgInstituteDropdownList: Array<any> = [];
  mstDocTypeDropdownList: Array<any> = [];
  mstDoaAmountDropdownList: Array<any> = [];
  inDesignationDropdownList: Array<any> = [];
  userDropdownList: Array<any> = [];
  formdata = {
    // ud_dc_id: '1',
    qaTitle: 'Template Configuration HERE',
    // ud_url: 'http://117:211:126:13:8082/abc',
    // ud_course_id: '1',
    // ud_class_id: '1',
    // ud_department_id: '2',
    // ud_remark: 'Remark Here',
    // ud_attachment: '',
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private api: globalService,
              private notifyService: NotificationService,
              private location: Location,
              private datePipe: DatePipe) {
    // console.log("ABC Called");
    this.getOrgInstituteDropdown();
    this.getMstDocTypeDropdown();
    this.getMstDoaAmountDropdown();
    this.editDocDtInstituteTemplateForm = this.createEditDocDtInstituteTemplateForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      const dditId = parameterMap.get('dditId');
      console.log("dditId is " + dditId);
      this.getDocDtInstituteTemplate(dditId);
    });
  }

  getDocDtInstituteTemplate(dditId) {
    let request = {};
    this.api.getData('mst_doc_dt_institute_template/get/' + dditId, request).subscribe(resp => {
      this.docDtInstituteTemplateData = resp;

      for (let i = 0; i < this.docDtInstituteTemplateData.length; i++) {
        if (this.docDtInstituteTemplateData.length > 0) {
          this.fieldArray.push({
            'duUserId': this.docDtInstituteTemplateData[i].duUserId,
            'designationName': this.docDtInstituteTemplateData[i].positionName,
            'userFullname': this.docDtInstituteTemplateData[i].userFullname,
            'instituteName': this.docDtInstituteTemplateData[i].assignedInstitute
          });
        }
      }

      console.log("Field Array Response => ", this.fieldArray);
      this.editDocDtInstituteTemplateForm.patchValue({
        dditId: resp[0].dditId,
        dditDescription: resp[0].dditDescription,
        dditNoOfSteps: resp[0].dditNoOfSteps,
        dditInstituteId: {
          instituteId: resp[0].dditInstituteId
        },
        dditDtId: {
          dtId: resp[0].dditDtId
        },
        dditDaId: {
          daId: resp[0].dditDaId
        }
      });
      // console.log("Response qaTsId => ", resp[0].qaTsId);
    });
  }


  onSubmit() {
    // console.log("Before add master => ", this.fieldArray);

    let user = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("LoggedIn UserId : ", user.id);
    this.editDocDtInstituteTemplateForm.get('createdBy').setValue(user.id);

    this.editDocDtInstituteTemplateForm.controls.dditId.setValue(this.docDtInstituteTemplateData[0].dditId);

    let obj = {
      "onlineExamId": this.editDocDtInstituteTemplateForm.get('onlineExamId').value,
      "examDescription": this.editDocDtInstituteTemplateForm.get('examDescription').value,
      "examDate": this.editDocDtInstituteTemplateForm.get('examDate').value,
      "mstSubjectId": {
        "subjectId": this.editDocDtInstituteTemplateForm.controls.mstSubjectId.get('subjectId').value
      },
      "examQuestion": this.fieldArray,
      "examStartTime": this.editDocDtInstituteTemplateForm.get('examStartTime').value,
      "examEndTime": this.editDocDtInstituteTemplateForm.get('examEndTime').value,
      "createdBy": this.editDocDtInstituteTemplateForm.get('createdBy').value
    };

    // console.log("OBJECT VALUE : ", obj);

    this.api.addArrayData('mst_doc_dt_institute_template', obj).subscribe(resp => {
      if (resp.message == "Duplicate") {
        this.notifyService.showError("Online Exam already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
        // console.log("Record Added Failed");
      }
    });
  }

  createEditDocDtInstituteTemplateForm(): FormGroup {
    return this.editDocDtInstituteTemplateForm = this.fb.group({
      'dditId': [''],
      'dditInstituteId': this.fb.group({
        'instituteId': ['', Validators.required]
      }),
      'dditDtId': this.fb.group({
        'dtId': ['', Validators.required]
      }),
      'dditDaId': this.fb.group({
        'daId': ['', Validators.required]
      }),
      'dditDescription': ['', [Validators.required]],
      'dditNoOfSteps': ['', [Validators.required]],

      'duInstituteId': this.fb.array([]),
      'duDesignationId': this.fb.array([]),
      'duUserId': this.fb.array([]),
      'relDditUserList': [''],
      'createdBy': ['']
    });
  }

  getOrgInstituteDropdown() {
    let request = {
      query: ""
    }
    this.api.getData('institute/all', request).subscribe(resp => {
      console.log(resp);
      this.orgInstituteDropdownList = resp;
    });
  }

  getMstDocTypeDropdown() {
    const request = {
      query: ""
    };
    this.api.dropdown('mst_doc_type/all', request).subscribe(resp => {
      console.log(resp);
      this.mstDocTypeDropdownList = resp.content;
    });
  }

  getMstDoaAmountDropdown() {
    const request = {
      query: ""
    };
    this.api.dropdown('mst_doa_amount/all', request).subscribe(resp => {
      console.log(resp);
      this.mstDoaAmountDropdownList = resp.content;
    });
  }

  getDesignationByInstituteIdDropdown(event: any, index: any) {
    console.log("event value is ", event.value);
    this.fieldArray[index].instituteName = event.source.triggerValue;
    const request = {
      query: ""
    };
    this.api.dropdown('designation/getByInstituteId/' + event.value, request).subscribe(resp => {
      console.log(resp);
      this.inDesignationDropdownList = resp;
    });
  }

  getUserByDesignationIdDropdown(event: any, index: any) {
    console.log("event is ", event.value);
    console.log("index is ", index);
    this.fieldArray[index].designationName = event.source.triggerValue;
    const request = {
      query: ""
    };
    this.api.dropdown('designation/allUserByDesignationId/' + event.value, request).subscribe(resp => {
      console.log(resp);
      this.userDropdownList = resp;
    });
  }

  getSelectedUser(event: any, index: any) {
    this.fieldArray[index].userFullname = event.source.triggerValue;
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  goBack() {
    this.location.back();
  }
}
