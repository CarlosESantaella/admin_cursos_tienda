import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoryService } from '../../categories/service/category.service';
import { CouponService } from '../service/coupon.service';

@Component({
  selector: 'app-coupon-delete',
  templateUrl: './coupon-delete.component.html',
  styleUrls: ['./coupon-delete.component.scss']
})
export class CouponDeleteComponent implements OnInit {

  @Input() COUPON:any;
  @Output() couponDeleteEvent:EventEmitter<any> = new EventEmitter();
  isLoading:any;

  constructor(
    public couponService:CouponService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.couponService.isLoading$;
  }

  delete(){
    this.couponService.deleteCoupon(this.COUPON.id).subscribe((resp:any) => {
      console.log(resp);
      this.couponDeleteEvent.emit(resp);
      this.modal.dismiss();
    });
  }

}
