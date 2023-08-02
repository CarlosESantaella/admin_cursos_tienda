import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-delete',
  templateUrl: './discount-delete.component.html',
  styleUrls: ['./discount-delete.component.scss']
})
export class DiscountDeleteComponent implements OnInit {

  @Input() DISCOUNT:any;
  @Output() discountDeleteEvent:EventEmitter<any> = new EventEmitter();
  isLoading$:any;

  constructor(
    public discountService:DiscountService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.discountService.isLoading$;
  }

  delete(){
    this.discountService.deleteDiscount(this.DISCOUNT.id).subscribe((resp:any) => {
      console.log(resp);
      this.discountDeleteEvent.emit(resp);
      this.modal.dismiss();
    });
  }

}
