import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/core/service/auth.service';
import {SigninService} from './signin.service';
import {Role} from 'src/app/core/models/role';
import {InDepartment} from "../../sharing/model/in-department";
import {NotificationService} from "../../notification.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  error = '';
  userActionArray: Array<any> = [];
  hide = true;
  roleName: string;
  userResponse: any;
  routeUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signinService: SigninService,
    private authService: AuthService,
    private notifyService: NotificationService
  ) {
  }

  signinFailed = false;

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      userUsername: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.authService
        .login(this.f.userUsername.value, this.f.userPassword.value)
        .subscribe(
          (res) => {
            this.userResponse = res;
            if (res?.code == "100") {
              const role = this.authService.currentUserValue.role;
              console.log("role is ", role);
              if (role === Role.All || role === Role.Admin) {
                console.log("Hey 123");
                this.loadUserAction();
                this.routeUrl = '/admin/dashboard/dashboard2';
              } else {
                console.log("Hey 456");
                this.loadUserAction();
                this.routeUrl = '/helpdesk-query/my-helpdesk-querys';
              }
              // else {
              //   this.router.navigate(['/authentication/signin']);
              // }
            } else {
              this.notifyService.showError("Wrong Username And Password.", "Error");
              this.error = 'Invalid Login';
            }
          },
        );
    }
  }

  loadUserAction() {
    this.signinService.getTrnUserRoleActionByUserId(this.userResponse?.id).subscribe(resp => {
      localStorage.setItem("userAction", JSON.stringify(resp?.userActionId));
      if (this.userResponse?.role != null && (resp?.userActionId == null || resp?.userActionId == undefined || resp?.userActionId == '')) {
        if (this.userResponse?.role == "Teacher") {
          this.roleName = "Faculty";
        } else {
          this.roleName = this.userResponse?.role;
        }
        this.signinService.getTrnRoleActionByRoleName(this.roleName).subscribe(roleResp => {
          console.log("Role Resp => ", roleResp);
          for (let i = 0; i < roleResp.length; i++) {
            this.userActionArray.push(roleResp[i].raActionId);
          }
          this.router.navigate([this.routeUrl]);
          localStorage.setItem("userAction", JSON.stringify(this.userActionArray));
        });
      }
    });
  }

  submit(form) {
    this.signinService.login(form).subscribe(resp => {
        console.log(resp)
        if (resp.code == "100") {
          this.router.navigate(['/admin/dashboard/main']);
        } else {
          this.notifyService.showError("Wrong Username And Password.", "Error");
          this.signinFailed = true;
        }
      },
      // (error: AppError) => {
      //   throw error;
      // }
    );
  }
}
