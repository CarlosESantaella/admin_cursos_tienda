import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {

  @Input() CATEGORY:any;
  @Output() categoryDeleteEvent:EventEmitter<any> = new EventEmitter();
  isLoading:any;

  constructor(
    public categoryService:CategoryService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.categoryService.isLoading$;
  }

  delete(){
    this.categoryService.deleteCategory(this.CATEGORY.id).subscribe((resp:any) => {
      console.log(resp);
      this.categoryDeleteEvent.emit(resp);
      this.modal.dismiss();
    });
  }

}
