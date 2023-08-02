import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../service/category.service';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  CATEGORIES:any = [];
  isLoading:any = null;

  search:any = null;
  state:any = null;

  constructor(
    public modalService:NgbModal,
    public categoryService:CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoading = this.categoryService.isLoading$;
    this.categoryService.listCategories().subscribe((resp:any) => {
      console.log([resp.categories.data, 'hola mundo 1']);
      this.CATEGORIES = resp.categories.data;
      // this.cdr.detectChanges(); // Detectar cambios
    });
    this.listCategories();
  }
  
  listCategories(){

    this.categoryService.listCategories(this.search, this.state).subscribe((resp:any) => {
      console.log([resp.categories.data, 'hola mundo 1']);
      this.CATEGORIES = resp.categories.data;
      console.log([this.CATEGORIES, 'hola mundo 2']);
      // this.cdr.detectChanges(); // Detectar cambios
    });
  }

  openModalCreateCategory(){
    const modalRef = this.modalService.open(CategoryAddComponent, {
      centered: true, 
      size: 'md'
    });
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category:any) => {
      return !category.category_id;
    });
    modalRef.componentInstance.categoryCreateEvent.subscribe((resp:any)=> {
      console.log(resp);
      // let INDEX = this.CATEGORIES.findIndex((item:any) => item.id === resp.id);
      this.CATEGORIES.unshift(resp);
    });
  }

  editCategory($event:Event, CATEGORY:any){
    $event.preventDefault();
    const modalRef = this.modalService.open(CategoryEditComponent, {
      centered: true,
      size: 'md'
    });
    console.log(CATEGORY);
    modalRef.componentInstance.CATEGORY  = CATEGORY;
    modalRef.componentInstance.CATEGORIES = this.CATEGORIES.filter((category:any) => {
      return !category.category_id;
    });
    modalRef.componentInstance.categoryEditEvent.subscribe((resp:any)=> {
      console.log(resp);
      let INDEX = this.CATEGORIES.findIndex((item:any) => item.id === resp.id);
      this.CATEGORIES[INDEX] = resp;
    });
  }

  deleteCategory($event:Event, CATEGORY:any){
    $event.preventDefault();
    const modalRef = this.modalService.open(CategoryDeleteComponent, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.CATEGORY  = CATEGORY;
    modalRef.componentInstance.categoryDeleteEvent.subscribe((resp:any)=> {
      let INDEX = this.CATEGORIES.findIndex((item:any) => item.id === CATEGORY.id);
      this.CATEGORIES.splice(INDEX, 1);
    });
  }

}
