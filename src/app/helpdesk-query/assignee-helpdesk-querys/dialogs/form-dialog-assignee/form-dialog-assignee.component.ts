import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import {globalService} from "../../../../sharing/global.service";
import {NotificationService} from "../../../../notification.service";
import { Location } from '@angular/common';
import {ExampleDataSource} from "../../assignee-helpdesk-querys.component";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";
import {HelpdeskQuerysService} from "../../../all-helpdesk-querys/helpdesk-querys.service";
import {HelpdeskQuerysModel} from "../../../all-helpdesk-querys/helpdesk-querys.model";
@Component({
  selector: 'app-form-dialog-assignee',
  templateUrl: './form-dialog-assignee.component.html',
  styleUrls: ['./form-dialog-assignee.component.sass'],
})
export class FormDialogAssigneeComponent implements OnInit {
  action: string;
  dialogTitle: string;
  hour1: string;
  min1: string;
  sec1: string;
  hour2: string;
  min2: string;
  sec2: string;
  editMstHelpdeskQueryForm: FormGroup;
  helpdeskQueryModel: HelpdeskQuerysModel;
  exampleDatabase: HelpdeskQuerysService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  mstModuleDropdownList: Array<any> = [];
  mstSubModuleDropdownList: Array<any> = [];


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

  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));

  public options = [
    {value: true, label: 'True'},
    {value: false, label: 'False'}
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

  currentStringDate: any;
  hqDatetime: any;
  hqAssignDatetime: any;
  userFullname: any;

  hqResolvedBy: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogAssigneeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public helpdeskQuerysModelService: HelpdeskQuerysService,
    private fb: FormBuilder,
    private api: globalService,
    private notifyService: NotificationService,
    private location: Location,
    public httpClient: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.hqResolvedBy = user.user_fullname;
    this.currentStringDate = new Date().toISOString();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      console.log(data)
      this.dialogTitle = data.mstHelpdeskQuery.hqDescription;
      this.helpdeskQueryModel = data.mstHelpdeskQuery;
      this.hqDatetime = this.datePipe.transform(new Date(this.helpdeskQueryModel.hqDatetime), 'dd/MM/yyyy, HH:mm:ss');
      this.hqAssignDatetime = this.datePipe.transform(new Date(this.helpdeskQueryModel.hqAssignDatetime), 'dd/MM/yyyy, HH:mm:ss');
      console.log(this.hqDatetime + " HQ EDIT " + this.helpdeskQueryModel.hqDatetime);
      this.userFullname = this.helpdeskQueryModel.hqUserId['userFullname'];
    } else {
      this.dialogTitle = 'New  Helpdesk Querys';
      this.helpdeskQueryModel = new HelpdeskQuerysModel({});
    }

    this.editMstHelpdeskQueryForm = this.createEditHelpdeskQueryForm();
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

  ngOnInit() {
    this.editMstHelpdeskQueryForm.controls.hqModuleId.get("moduleId").disable();
    this.editMstHelpdeskQueryForm.controls.hqSmId.get("smId").disable();
    this.editMstHelpdeskQueryForm.controls.hqCloseDatetime.disable();
  }

  createEditHelpdeskQueryForm(): FormGroup {
    this.getMstModuleDropdown();
    this.getMstSubModuleDropdown(this.helpdeskQueryModel.hqModuleId["moduleId"]);
    return this.fb.group({
      hqId: [this.helpdeskQueryModel.hqId],
      hqInstituteId: this.fb.group({
        instituteId: [this.helpdeskQueryModel?.hqInstituteId["instituteId"]],
      }),
      hqDatetime: [this.helpdeskQueryModel.hqDatetime],
      hqNo: [this.helpdeskQueryModel.hqNo],
      hqModuleId: this.fb.group({
        moduleId: [this.helpdeskQueryModel?.hqModuleId["moduleId"]],
      }),
      hqSmId: this.fb.group({
        smId: [this.helpdeskQueryModel?.hqSmId["smId"]],
      }),
      hqDescription: [this.helpdeskQueryModel.hqDescription],
      hqUserId: this.fb.group({
        userId: [(this.helpdeskQueryModel.hqUserId != null) ? this.helpdeskQueryModel.hqUserId["userId"] : ''],
      }),
      hqUserMobile: [this.helpdeskQueryModel?.hqUserMobile],
      hqAttachment: [this.helpdeskQueryModel?.hqAttachment],
      hqTypeOfQuery: [this.helpdeskQueryModel?.hqTypeOfQuery],
      hqRemark: [this.helpdeskQueryModel?.hqRemark],
      hqAssignTo: [this.helpdeskQueryModel?.hqAssignTo],
      hqAssignDatetime: [this.helpdeskQueryModel?.hqAssignDatetime],
      hqCloseDatetime: [this.helpdeskQueryModel?.hqCloseDatetime, [Validators.required]],
      hqAssigneeStatus: [this.helpdeskQueryModel?.hqAssigneeStatus, [Validators.required]],
      hqAssigneeRemark: [this.helpdeskQueryModel?.hqAssigneeRemark, [Validators.required]],
      hqAssignBy: [this.helpdeskQueryModel?.hqAssignBy, [Validators.required]],
      hqResolvedBy: [null]
    });
  }

  submit() {
    this.editMstHelpdeskQueryForm.get('hqResolvedBy').patchValue(this.hqResolvedBy);
    let data = this.editMstHelpdeskQueryForm.getRawValue();
    console.log("getRawValue() ", this.editMstHelpdeskQueryForm.getRawValue());
    this.api.addWithFullURL('mst_helpdesk_query/save', data).subscribe(resp => {
      if (resp.success) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['helpdesk-query/assignee-helpdesk-querys']);
        });
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
        console.log("Record Added Failed");
      }
    });
  }

  getMstModuleDropdown() {
    let request = {
      query: ""
    }
    this.api.getData('mst_module/all', request).subscribe(resp => {
      this.mstModuleDropdownList = resp['content'];
    });
  }

  getMstSubModuleDropdown(event) {
    let request = {
      query: ""
    }
    this.api.getData('mst_sub_module/allByModuleId/' + event, request).subscribe(resp => {
      this.mstSubModuleDropdownList = resp;
    });
  }

  callFunction() {
    console.log("callFunction called");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.helpdeskQuerysModelService.addHelpdeskQuery(this.editMstHelpdeskQueryForm.getRawValue());
  }

  goBack() {
    this.location.back();
  }
}
