import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HttpClientModule } from '@angular/common/http';
import { CouponAddComponent } from './coupon-add/coupon-add.component';
import { CouponDeleteComponent } from './coupon-delete/coupon-delete.component';
import { CouponEditComponent } from './coupon-edit/coupon-edit.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponService } from './service/coupon.service';


@NgModule({
  declarations: [
    CouponComponent,
    CouponAddComponent,
    CouponEditComponent,
    CouponDeleteComponent,
    CouponListComponent,
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ],
  providers: [
    CouponService
  ]
})
export class CouponModule { }
