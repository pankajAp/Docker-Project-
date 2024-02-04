import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {InCourse} from 'src/app/sharing/model/in-course';
import {InClass} from 'src/app/sharing/model/in-class';
import {InBatch} from 'src/app/sharing/model/in-batch';
import {NotificationService} from "../../../notification.service";
import {Actions} from '../../actions/all-actions/actions.model';
import {Roles} from '../../role/all-roles/roles.model';
import {User} from 'src/app/core/models/user';
import {UserRoleActionsService} from '../all-user-role-actions/user-role-actions.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {INgxSelectOption} from 'ngx-select-ex';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-add-user-role-action',
  templateUrl: './add-user-role-action.component.html',
  styleUrls: ['./add-user-role-action.component.sass']
})
export class AddUserRoleActionComponent implements OnInit {
  userRoleActionForm: FormGroup;
  actionList: Actions[];
  roleList: Roles[];
  userList: User[];
  userRoleActionService: UserRoleActionsService;
  actionArray: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings;
  dataArray: any;
  items: Array<any> = [];
  userListData: User[] = [];
  selected: any;

  filteredOptions: Observable<User[]>;
  userObj: any;

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.userRoleActionForm = this.fb.group({

      'userId': ['', [Validators.required]],
      'userRoleId': this.fb.group({
        'roleId': ['', [Validators.required]],
      }),
      'userActionId': ['', [Validators.required]]
    });

    this.getUsersData();
    this.getRolesDropdown();
    this.getActionsData();

  }

  ngOnInit() {
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'actionId',
      textField: 'actionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.selected = [
      {id: 2, playerName: 'Toni Kroos'}
    ];
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit() {
    // console.log("Form VALUE => ", this.userRoleActionForm.value);
    // this.userObj = this.userRoleActionForm.get("userId").value;
    // console.log("USER OBJ 1 => ", this.userObj.user_id);

    // this.userRoleActionForm.get("userId").setValue(this.userObj.user_id);

    console.log("FORM => ", this.userRoleActionForm.value);
    // console.log("USER OBJ 10 => ", this.userRoleActionForm.get("userId").value);

    this.api.add('trn_user_role_action', this.userRoleActionForm.value).subscribe(resp => {
      console.log("Response => " + resp + " Response Message => " + resp.success);
      if (resp == "Duplicate") {
        this.notifyService.showError("User Role Action already defined.", "Error");
      } else if (resp.success == 1) {
        this.notifyService.showSuccess("User Role Action Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Added Failed.", "Error");
      }
    });
  }

  getUsersData() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    let userInstituteId = userDetails.userInstituteId;

    let request = {
      query: ""
    }
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
    // console.log("getInCourseDropdown called");
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

  abc(val) {
    console.log("called abc", val);
  }

  goBack() {
    this.location.back();
  }
}
