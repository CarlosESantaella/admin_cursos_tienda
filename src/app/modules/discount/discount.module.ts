import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountComponent } from './discount.component';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountDeleteComponent } from './discount-delete/discount-delete.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ckeditor4-angular';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    DiscountComponent,
    DiscountAddComponent,
    DiscountDeleteComponent,
    DiscountEditComponent,
    DiscountListComponent
  ],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    CKEditorModule
  ]
})
export class DiscountModule { }
