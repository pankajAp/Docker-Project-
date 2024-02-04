import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {formatDate} from '@angular/common';
import {RoleActionsService} from "../../role-actions.service";
import {RoleActions} from "../../role-actions.model";
import {globalService} from "../../../../../sharing/global.service";
import {InCourse} from "../../../../../sharing/model/in-course";
import {InClass} from "../../../../../sharing/model/in-class";
import {InBatch} from "../../../../../sharing/model/in-batch";
import {NotificationService} from "../../../../../notification.service";
import {Location} from '@angular/common';
import {ExampleDataSource} from "../../all-role-actions.component";
import {BehaviorSubject, fromEvent, merge, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DataSource} from "@angular/cdk/collections";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Actions} from 'src/app/master/actions/all-actions/actions.model';
import {Roles} from 'src/app/master/role/all-roles/roles.model';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  // timetableForm: FormGroup;
  editRoleActionForm: FormGroup;
  roleActions: Array<any> = [];
  actionList: Actions[];
  revisedActionList: Array<any> = [];
  ActionsListByRoleId: Actions[];
  roleList: Roles[];
  actionArray: Array<any> = [];
  roleActionArray: Array<any> = [];
  isChecked = false;
  result: any;

  exampleDatabase: RoleActionsService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roleActionsService: RoleActionsService,
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
      this.dialogTitle = data.roleActions.name;
      this.roleActions = data.roleActions;
    } else {
      this.dialogTitle = 'New Role Actions';
      // this.roleActions = new RoleActions({});
      this.roleActions = [];
    }
    console.log("ROLE DATA => ", data.roleActions.roleId + " <> " + data.roleActions.roleName + " <> " + data.roleActions.raId);
    this.editRoleActionForm = this.createEditRoleActionForm();

    this.getRolesDropdown();
    console.log("Role ID is => " + data.roleActions.roleId);
    this.getActionsData(data.roleActions.roleId);
  }

  formControl = new FormControl('', [
    Validators.required,

  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createEditRoleActionForm(): FormGroup {
    // console.log("RoleAction Details ==> ", this.roleActions?.raRoleId?.roleId + " <> " + this.roleActions?.raActionId.actionId);
    console.log("RoleAction Details ==> ", this.roleActions['raId']);
    return this.fb.group({
      // raId: [this.roleActions['raId']],
      raRoleId: this.fb.group({
        roleId: [this.roleActions['roleId'], [Validators.required]],
      }),
      raActionId: this.fb.group({
        actionId: [this.roleActions['actionId']]
      })
    });
  }

  getRolesDropdown() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.dropdown('mst_role/all', request).subscribe(resp => {
      console.log(resp);
      this.roleList = resp;
      // console.log("Role List => ", this.roleList["content"]);
      this.roleList = this.roleList["content"];

      console.log("Role List DATA => ", this.roleList);
    });
  }

  getActionsData(roleId) {
    let request = {
      query: ""
    }
    this.api.getData('mst_action/all', request).subscribe(resp => {
      console.log("A => " + resp["content"]);
      this.actionList = resp;
      this.actionList = this.actionList["content"];
      this.getRoleActionsData(roleId);
    });
  }

  getRoleActionsData(roleId) {
    let request = {
      roleId: roleId
    }
    this.api.getData('trn_role_action/allByRaRoleId/' + roleId, request).subscribe(resp => {
      this.ActionsListByRoleId = resp;
      for (let singleAction of this.actionList) {
        const result = this.ActionsListByRoleId.filter(f =>
          f['raActionId'].actionId === singleAction.actionId
        );

        const newResult = result.map(item => item["raActionId"].actionId);

        if (singleAction.actionId == newResult[0]) {

          this.actionArray.push(singleAction.actionId);

          this.roleActionArray.push({
            "actionId": singleAction.actionId,
            "actionName": singleAction.actionName,
            "isChecked": true
          });

        } else {
          this.roleActionArray.push({
            "actionId": singleAction.actionId,
            "actionName": singleAction.actionName,
            "isChecked": false
          });
        }
      }
      console.log("ROLE ACTION ARRAY is => ", this.roleActionArray);
    });
  }

  submit() {
    // console.log("EDIT FORM ACTION ARRAY DATA : ", this.actionArray);
    this.deleteItem();
    for (let singleAction of this.actionArray) {
      this.editRoleActionForm.controls.raActionId.get("actionId").setValue(singleAction);
      let data = this.editRoleActionForm.value;
      this.api.add('trn_role_action', data).subscribe(resp => {
        if (resp) {
        } else {
          this.notifyService.showError("Record Added Failed.", "Error");
        }
      });
      this.notifyService.showSuccess("Record Updated Successfully.", "Success");
      this.dialogRef.close();
    }
    this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
      this.router.navigate(['master/role-action/all-role-actions']);
    });
  }

  deleteItem() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.roleActionsService.deleteByRaRoleId(this.editRoleActionForm.controls.raRoleId.get("roleId").value, userDetails.id);
  }

  onChange(action: string, isChecked: boolean) {
    console.log(action);
    if (isChecked) {
      this.actionArray.push(action);
    } else {
      // let index = this.actionArray.controls.findIndex(x => x.value == action)
      // this.actionArray.removeAt(index);
      const index: number = this.actionArray.indexOf(action);
      if (index !== -1) {
        this.actionArray.splice(index, 1);
      }
    }
    console.log(this.actionArray);
  }

  callFunction() {
    console.log("callFunction called");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.roleActionsService.addRoleActions(this.editRoleActionForm.getRawValue());
  }

  goBack() {
    this.location.back();
  }
}
