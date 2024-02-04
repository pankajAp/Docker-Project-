import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {globalService} from 'src/app/sharing/global.service';
import {DatePipe, Location} from '@angular/common';
import {NotificationService} from "../../../notification.service";
import {Actions} from '../../actions/all-actions/actions.model';
import {Roles} from '../../role/all-roles/roles.model';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-role-action',
  templateUrl: './add-role-action.component.html',
  styleUrls: ['./add-role-action.component.sass']
})

export class AddRoleActionComponent {
  roleActionForm: FormGroup;
  actionList: Actions[];
  roleList: Roles[];
  actionArray: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings;

  constructor(private fb: FormBuilder,
              private location: Location,
              private api: globalService,
              private notifyService: NotificationService,
              private datePipe: DatePipe) {
    this.roleActionForm = this.fb.group({
      raRoleId: this.fb.group({
        roleId: ['', [Validators.required]],
      }),
      raActionId: this.fb.group({
        actionId: ['', [Validators.required]],
      })
    });
    this.getRolesDropdown();
    this.getActionsData();
  }

  // ngOnInit() {
  //   this.selectedItems = [];
  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'actionId',
  //     textField: 'actionName',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     allowSearchFilter: true
  //   };
  // }

  onSubmit() {
    console.log("Form VALUE => ", this.roleActionForm.value);

    for (let singleAction of this.actionArray) {
      this.roleActionForm.controls.raActionId.get("actionId").setValue(singleAction);

      this.api.add('trn_role_action', this.roleActionForm.value).subscribe(resp => {
        console.log("Response => " + resp.message + " Response Message => " + resp.success);
        if (resp == "Duplicate") {
          this.notifyService.showError("Role Action already defined.", "Error");
        } else if (resp.success == 1) {
          this.notifyService.showSuccess("Role Action Added Successfully.", "Success");
          this.goBack();
        } else {
          this.notifyService.showError("Record Added Failed.", "Error");
        }
      });
    }
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

  onChange(actionId, isChecked) {
    if (isChecked) {
      this.actionArray.push(actionId);
    } else {
      this.actionArray = this.actionArray.filter(item => item !== actionId);
    }
  }

  abc(val) {
    console.log("called abc", val);
  }

  goBack() {
    this.location.back();
  }
}
