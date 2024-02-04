import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from "../../notification.service";
import {globalService} from "../../sharing/global.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-change-password',
  templateUrl: './edit-change-password.component.html',
  styleUrls: ['./edit-change-password.component.sass'],
})
export class EditChangePasswordComponent {
  editChangePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private  api: globalService,
              private route: ActivatedRoute,
              private router: Router,
              private notifyService: NotificationService) {
    this.editChangePasswordForm = this.createEditChangePasswordForm();
    let userdetails = JSON.parse(sessionStorage.getItem("user"))
    this.editChangePasswordForm.get('userId').setValue(userdetails.user_id);
  }

  checkoldpassword(oldpass) {
    let userdetails = JSON.parse(sessionStorage.getItem("user"))
    let sessionpasswordvalue = userdetails.user_password
    if (oldpass != sessionpasswordvalue) {
      this.editChangePasswordForm.get('oldPassword').setValue("");
      this.notifyService.showInfo("Old password is incorrect.", "Alert");
    }
  }

  newconformcheck(newpass, conformpass) {
    if (newpass != conformpass) {
      this.editChangePasswordForm.get('confirmPassword').setValue("");
      this.notifyService.showInfo("New password and Conform password in not Match.", "Alert");
    }
  }

  onSubmit() {
    this.api.updaterecord("changepassword", this.editChangePasswordForm.value).subscribe(res => {
      console.log(res)
      if (res.code == 100) {
        this.notifyService.showSuccess("Password Changed Successfully.", "Success");
        this.router.navigate(['/authentication/signin']);
      }
    });
    console.log(this.editChangePasswordForm.value);
  }

  createEditChangePasswordForm(): FormGroup {
    return this.fb.group({
      userId: [""],
      oldPassword: ['', [Validators.required]], //, Validators.pattern('[a-zA-Z]+')
      userPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
}
