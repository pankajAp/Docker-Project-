import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {NotificationService} from "../../notification.service";
import {Globalpath} from 'src/app/sharing/globalpath';
import {HelpdeskQuerysService} from '../all-helpdesk-querys/helpdesk-querys.service';
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-helpdesk-query.component.html',
  styleUrls: ['./add-helpdesk-query.component.sass']
})
export class AddHelpdeskQueryComponent implements OnInit {
  mstHelpdeskQueryForm: FormGroup;
  userList: Array<any> = [];
  currentStringDate: any;
  currentStringTime: any;
  hqNo: any;
  complaintInstituteId: any;
  clicked: Boolean = false;
  hqAttachmentFilePath: any = '';

  mstModuleDropdownList: Array<any>;
  mstSubModuleDropdownList: Array<any>;

  @ViewChild('picker') picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  // public formGroup = new FormGroup({
  //   date: new FormControl(null),
  //   date2: new FormControl(null)
  // })
  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  // public dateControl = new Date(2021, 9, 4, 5, 6, 7);
  // public dateControlMinMax = new FormControl(new Date());

  public options = [
    {value: true, label: 'True'},
    {value: false, label: 'False'}
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

//   public codeDatePicker = `
// <mat-form-field>
//   <input matInput [ngxMatDatetimePicker]="picker"
//                   placeholder="Choose a date"
//                   [formControl]="dateControl"
//                   [min]="minDate" [max]="maxDate"
//                   [disabled]="disabled">
//   <mat-datepicker-toggle matSuffix [for]="picker">
//   </mat-datepicker-toggle>
//   <ngx-mat-datetime-picker #picker
//     [showSpinners]="showSpinners"
//     [showSeconds]="showSeconds"
//     [stepHour]="stepHour" [stepMinute]="stepMinute"
//     [stepSecond]="stepSecond"
//     [touchUi]="touchUi"
//     [color]="color">
//   </ngx-mat-datetime-picker>
// </mat-form-field>`;
//
//   public codeTimePicker = `
// <ngx-mat-timepicker
//             [(ngModel)]="date" [disabled]="disabled"
//             [showSpinners]="showSpinners"
//             [stepHour]="stepHour" [stepMinute]="stepMinute"
//             [stepSecond]="stepSecond"
//             [showSeconds]="showSeconds">
// </ngx-mat-timepicker>`;
//
//
//   public codeFormGroup = `
//   <div [formGroup]="formGroup">
//     <mat-form-field>
//       <input matInput [ngxMatDatetimePicker]="picker1"
//       placeholder="Choose a date" formControlName="date">
//       <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
//       <ngx-mat-datetime-picker #picker1></ngx-mat-datetime-picker>
//     </mat-form-field>
//   </div>`;
//
//   public code1 = `formGroup.get('date').value?.toLocaleString()`;
//
//   public codeFormGroup2 = `
//   <form [formGroup]="formGroup">
//     <ngx-mat-timepicker formControlName="date2"></ngx-mat-timepicker>
//   </form>`;
//
//   public code2 = `formGroup.get('date2').value?.toLocaleString()`;

  userName: any;
  userMobile: any;
  userPosition: any;
  userInstitute: any;

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.currentStringDate = new Date().toISOString(); // .substring(0, 10);
    // this.currentStringDate = this.datePipe.transform(new Date(), "dd/MM/yyyy, HH:mm:ss");
    console.log("this.currentStringDate => ", this.currentStringDate);
    this.currentStringTime = this.datePipe.transform(new Date(), "hh:mm a");
    const userDetails: any = JSON.parse(sessionStorage.getItem('user'));
    console.log("userDetails => ", userDetails);
    this.userName = userDetails.user_fullname;
    this.userMobile = userDetails.userMobile;
    this.userPosition = userDetails.positionName;
    this.userInstitute = userDetails.institute_name;
    this.mstHelpdeskQueryForm = this.fb.group({
      hqDatetime: [null],
      hqInstituteId: this.fb.group({
        instituteId: [null],
      }),
      hqUserId: this.fb.group({
        userId: [null],
      }),
      hqNo: [null],
      hqUserMobile: [null],
      hqModuleId: this.fb.group({
        moduleId: ['', [Validators.required]],
      }),
      hqSmId: this.fb.group({
        smId: ['', [Validators.required]],
      }),
      hqDescription: ['', [Validators.required]],
      hqAttachment: [''],
      hqPriority: ['', [Validators.required]],
    });
    this.getMstModuleDropdown();
  }

  ngOnInit() {
    this.mstHelpdeskQueryForm.controls.hqDatetime.disable();
  }

  onSelectedFile(event) {
    console.log('Call onSelectedFile => ', event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.mstHelpdeskQueryForm.get('hqAttachment').setValue(file);
    }
  }

  onSubmit() {
    const userDetails: any = JSON.parse(sessionStorage.getItem('user'));
    this.spinner.show();
    this.mstHelpdeskQueryForm.controls.hqInstituteId.get('instituteId').setValue(userDetails.user_institute_id);
    this.mstHelpdeskQueryForm.controls.hqUserId.get('userId').setValue(userDetails.user_id);
    let data = this.mstHelpdeskQueryForm.getRawValue();
    this.api.addWithFullURL('mst_helpdesk_query/save', data).subscribe(resp => {
      if (resp != null) {
        this.spinner.hide();
      }
      if (resp) {
        this.notifyService.showSuccess("Record Added Successfully.", "Success");
        this.router.navigate(['helpdesk-query/my-helpdesk-querys']);
      } else {
        this.notifyService.showError("Record Failed to Add.", "Error");
      }
    });
  }

  // getOrgInstituteDropdown() {
  //   let request = {
  //     query: ""
  //   }
  //   this.api.getData('institute/all', request).subscribe(resp => {
  //     console.log(resp);
  //     this.orgInstituteDropdownList = resp;
  //   });
  // }

  getMstModuleDropdown() {
    let request = {
      query: ""
    }
    this.api.getData('mst_module/all', request).subscribe(resp => {
      console.log("this.mstModuleDropdownList => ", resp);
      this.mstModuleDropdownList = resp['content'];
    });
  }

  getMstSubModuleDropdown(event: any) {
    let request = {
      query: ""
    }
    this.api.getData('mst_sub_module/allByModuleId/' + event, request).subscribe(resp => {
      console.log("this.mstSubModuleDropdownList => ", resp);
      this.mstSubModuleDropdownList = resp;
    });
  }

  getUsersData() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    let userInstituteId = userDetails.userInstituteId;

    let request = {
      query: ""
    }
    this.api.getData('in_department/allUser/' + userInstituteId, request).subscribe(resp => {
      // console.log(resp);
      this.userList = resp;
      console.log("User List => ", this.userList);
    });
  }

  abc(val) {
    console.log("called abc", val);
  }

  uploadMstHelpdeskQueryAttachmentOnServer(event: any) {
    let form = new FormData();
    form.append('file', event.target.files[0]);
    form.append('type', 'Helpdesk Query');
    this.api.postImage('uploadSingleFile', form).subscribe(resp => {
      console.log(resp);
      if (resp.operationStatus == 'SUCCESS') {
        this.hqAttachmentFilePath = resp.filePath;
        this.mstHelpdeskQueryForm.get('hqAttachment').setValue(resp.fileName);
      } else {
        console.log("NOT ABLE TO UPLOAD");
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
