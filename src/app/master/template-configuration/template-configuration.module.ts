import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateConfigurationRoutingModule } from './template-configuration-routing.module';
import { AddTemplateComponent } from './add-template/add-template.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [AddTemplateComponent],
  imports: [
    CommonModule,
    TemplateConfigurationRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [FormBuilder]
})
export class TemplateConfigurationModule { }
