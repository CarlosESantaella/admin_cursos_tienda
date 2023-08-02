import { Component, OnInit } from '@angular/core';
import { CouponService } from '../service/coupon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponDeleteComponent } from '../coupon-delete/coupon-delete.component';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {

  COUPONS:any = [];
  search:any = null;
  state:any = 0;

  isLoading$:any;

  constructor(
    public couponService:CouponService,
    public modalService:NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.couponService.isLoading$;
    this.listCoupons();
    
  }


  listCoupons(){
    this.couponService.listCoupons(this.search, this.state).subscribe((resp:any) => {
      console.log(resp);
      this.COUPONS = resp.coupons.data;
    });
  }

  deleteCoupon($event:any, COUPON:any){
    $event.preventDefault();
    const modalRef = this.modalService.open(CouponDeleteComponent, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.COUPON  = COUPON;
    modalRef.componentInstance.couponDeleteEvent.subscribe((resp:any)=> {
      let INDEX = this.COUPONS.findIndex((item:any) => item.id === COUPON.id);
      this.COUPONS.splice(INDEX, 1);
    });
  }

}
