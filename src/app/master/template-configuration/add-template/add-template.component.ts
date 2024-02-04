import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {globalService} from "../../../sharing/global.service";
import {NotificationService} from "../../../notification.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.sass']
})
export class AddTemplateComponent implements OnInit {
  addTemplateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private  api: globalService,
              private  location: Location,
              private notifyService: NotificationService) {

    this.addTemplateForm = this.fb.group({
      dftDfId: this.fb.group({
        dfId: ['', [Validators.required]],
      }),
      dftInstituteId: this.fb.group({
        instituteId: ['', [Validators.required]],
      }),
      dftCorrespondenceId: this.fb.group({
        correspondenceId: ['', [Validators.required]],
      }),
      dftDtId: ['', [Validators.required]],
      createdBy: [''],
      createdDate: [''],
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    // this.docFileTypeForm.get('createdBy').setValue(user.id);
    // this.docFileTypeForm.get('createdDate').setValue("2022-26-09");
    const data = this.addTemplateForm.value;
    console.log('data', data);
    this.api.add('uploaddocfiletype', data).subscribe(resp => {
      if (resp) {
        this.notifyService.showSuccess("Record Added Successfully.", "Success");
        this.goBack();
      } else {
        this.notifyService.showError("Record Failed to Add.", "Error");
        // console.log("Record Added Failed");
      }
    });
  }
}
