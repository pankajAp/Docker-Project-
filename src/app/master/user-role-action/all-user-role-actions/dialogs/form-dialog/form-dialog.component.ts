import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {UserRoleActionsService} from "../../user-role-actions.service";
import {UserRoleActions} from "../../user-role-actions.model";
import {globalService} from "../../../../../sharing/global.service";
import {NotificationService} from "../../../../../notification.service";
import {Location} from '@angular/common';
import {ExampleDataSource} from "../../all-user-role-actions.component";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {Actions} from 'src/app/master/actions/all-actions/actions.model';
import {Roles} from 'src/app/master/role/all-roles/roles.model';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {User} from 'src/app/core/models/user';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;

  editUserRoleActionForm: FormGroup;
  userRoleActions: UserRoleActions;
  actionList: Actions[];
  revisedActionList: Array<any> = [];
  ActionsListByRoleId: Actions[];
  roleList: Roles[];
  actionArray: Array<any> = [];
  roleActionArray: Array<any> = [];
  isChecked = false;
  result: any;
  userList: User[];
  selectedItems: Array<any> = [];
  userRoleActionsSelected: Array<any> = [];
  dropdownSettings: IDropdownSettings;
  allListByUserId: Array<any> = [];
  userArrayById: Array<any> = [];
  selected: any;
  userObj: any;


  exampleDatabase: UserRoleActionsService | null;
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roleActionsService: UserRoleActionsService,
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
      this.dialogTitle = data.userRoleActions.name;
      this.userRoleActions = data.userRoleActions;
    } else {
      this.dialogTitle = 'New User Role Actions';
      // this.roleActions = new UserRoleActions({});
      this.userRoleActions = new UserRoleActions({});
    }
    this.editUserRoleActionForm = this.createEditUserRoleActionForm();

    this.getUsersData();
    this.getRolesDropdown();
    this.getActionsData();
  }

  ngOnInit() {

    let request = {};

    console.log("USER ID => ", this.userRoleActions.userId);

    this.api.dropdown('trn_user_role_action/byUserId/' + this.userRoleActions.userId, request).subscribe(resp => {
      this.allListByUserId = resp;

      // console.log("Array here 1 => ", this.allListByUserId['userActionId']);

      for (let item of this.allListByUserId['userActionId']) {
        this.userArrayById.push(item);
      }
      console.log("Array here 2 => ", this.userArrayById);

      this.userArrayById.forEach(element => {
        this.userRoleActionsSelected.push(element);
      });

      console.log("Array here 3 => ", this.userRoleActionsSelected);
      this.selectedItems = this.userRoleActionsSelected;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'actionId',
      textField: 'actionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
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

  createEditUserRoleActionForm(): FormGroup {
    console.log("FORM VALUE TO EDIT => ", this.userRoleActions);

    // this.selected = this.userRoleActions['userFullname'];

    return this.fb.group
    ({
      roleActionId: [this.userRoleActions.roleActionId],
      userId: [this.userRoleActions['userId'], [Validators.required]],
      userRoleId: this.fb.group({
        roleId: [this.userRoleActions['roleId'], [Validators.required]],
      }),
      userActionId: [this.userRoleActions['userActionId'], [Validators.required]]
    });
  }

  getUsersData() {

    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    let userInstituteId = userDetails.userInstituteId;

    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");

    this.api.getAllData('allUser/' + userInstituteId, request).subscribe(resp => {
      // console.log(resp);
      this.userList = resp;
      console.log("User List => ", this.userList);
    });
  }

  getRolesDropdown() {
    let request = {
      query: ""
    }
    this.api.dropdown('mst_role/all', request).subscribe(resp => {
      console.log(resp);
      this.roleList = resp;
      // console.log("Role List => ", this.roleList["content"]);
      this.roleList = this.roleList["content"];

      console.log("ROle List DATA => ", this.roleList);
    });
  }

  getActionsData() {
    let request = {
      query: ""
    }
    // console.log("getInCourseDropdown called");
    this.api.getData('mst_action/all', request).subscribe(resp => {
      console.log(resp);
      this.actionList = resp;
      // console.log("Action List => ", this.actionList["content"]);
      this.actionList = this.actionList["content"];

      console.log("Action List DATA => ", this.actionList);
    });
  }

  submit() {
    let data = this.editUserRoleActionForm.value;

    this.userObj = this.editUserRoleActionForm.get("userId").value;

    this.editUserRoleActionForm.get("userId").setValue(this.userObj.user_id);

    console.log("USER OBJ 1 => ", this.userObj.user_id);

    console.log("PRINT EDIT FORM =>", data);

    this.api.add('trn_user_role_action', data).subscribe(resp => {
      if (resp) {
        this.notifyService.showSuccess("Record Updated Successfully.", "Success");
        this.dialogRef.close();
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() => {
          this.router.navigate(['master/user-role-action/all-user-role-actions']);
        });
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  onChange(action: string, isChecked: boolean) {
    console.log(action);
    if (isChecked) {
      this.actionArray.push(action);

    } else {
      // let index = this.actionArray.controls.findIndex(x => x.value == action)
      // this.actionArray.removeAt(index);
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
    this.roleActionsService.addUserRoleActions(this.editUserRoleActionForm.getRawValue());
  }

  goBack() {
    this.location.back();
  }
}
