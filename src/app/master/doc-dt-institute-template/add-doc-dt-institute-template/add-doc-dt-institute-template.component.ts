import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {NotificationService} from "../../../notification.service";
import {EmpEmployee} from 'src/app/sharing/model/emp-employee';

@Component({
  selector: 'app-add-online-exam',
  templateUrl: './add-doc-dt-institute-template.component.html',
  styleUrls: ['./add-doc-dt-institute-template.component.sass']
})
export class AddDocDtInstituteTemplateComponent {
  docDtInstituteTemplateForm: FormGroup;
  checkedTickets = [];
  public fieldArray: Array<any> = [];
  public updatedFieldArray: Array<any> = [];
  public newAttribute: any = {};
  orgInstituteDropdownList: Array<any> = [];
  mstDocTypeDropdownList: Array<any> = [];
  mstDoaAmountDropdownList: Array<any> = [];
  inDesignationDropdownList: Array<any> = [];
  userDropdownList: Array<any> = [];

  constructor(private fb: FormBuilder,
              private api: globalService,
              private location: Location,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.docDtInstituteTemplateForm = this.fb.group({
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
    this.getOrgInstituteDropdown();
    this.getMstDocTypeDropdown();
    this.getMstDoaAmountDropdown();
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

  getDesignationByInstituteIdDropdown(event: any) {
    console.log("event value is ", event.value);

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

  onSubmit() {
    let user = JSON.parse(localStorage.getItem('userDetails'));

    this.docDtInstituteTemplateForm.get('createdBy').setValue(user.id);
    for (let val of this.fieldArray) {
      let obj = {
        "userId": val.duUserId
      };
      this.updatedFieldArray.push({
        'duUserId': obj
      });
    }
    this.docDtInstituteTemplateForm.get('relDditUserList').setValue(this.updatedFieldArray);
    let obj = this.docDtInstituteTemplateForm.value;

    this.api.addArrayData('mst_doc_dt_institute_template', obj).subscribe(resp => {
      if (resp.message == "Duplicate") {
        this.notifyService.showError("Template Configuration already defined.", "Error");
      } else if (resp) {
        this.notifyService.showSuccess("Template Configuration Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  addFieldValue() {
    const noOfSteps = this.docDtInstituteTemplateForm.controls['dditNoOfSteps'].value;
    this.fieldArray = [];
    for (let i = 0; i < noOfSteps; i++) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  goBack() {
    this.location.back();
  }
}
