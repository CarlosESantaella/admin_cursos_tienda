import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  DISCOUNTS:any = [];
  search:any = null;
  state:any = null;

  isLoading$:any;

  constructor(
    public discountService:DiscountService,
    public modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.discountService.isLoading$;
    this.listDiscount();
  }

  listDiscount(){
    this.discountService.listDiscount(this.search, this.state).subscribe((resp:any) => {
      console.log(resp.discounts.data);
      this.DISCOUNTS = resp.discounts.data;
    });
  }

  deleteDiscount($event:Event, DISCOUNT:any){
    $event.preventDefault();
    const modalRef = this.modalService.open(DiscountDeleteComponent, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.DISCOUNT  = DISCOUNT;
    modalRef.componentInstance.discountDeleteEvent.subscribe((resp:any)=> {
      let INDEX = this.DISCOUNTS.findIndex((item:any) => item.id === DISCOUNT.id);
      this.DISCOUNTS.splice(INDEX, 1);
    });
  }


}
