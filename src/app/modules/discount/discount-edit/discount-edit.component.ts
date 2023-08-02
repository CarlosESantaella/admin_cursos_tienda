import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss'],
})
export class DiscountEditComponent implements OnInit {
  discount: number = 0;
  type_discount: number = 1;
  discount_type: number = 1;
  start_date: any = null;
  end_date: any = null;
  type_campaing: number = 1; // 1 es campaña normal, 2 es flash y 3 es banner
  //
  state:any = 1;

  categorie_id: any = null;
  course_id: any = null;

  courses: any = [];
  categories: any = [];

  categories_selecteds: any = [];
  courses_selecteds: any = [];

  isLoading$: any;

  discount_selected: any;
  discount_id: any;

  constructor(
    public discountService: DiscountService,
    public toaster: Toaster,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.discountService.isLoading$;
    this.discountService.lisConfig().subscribe((resp: any) => {
      console.log(resp);
      this.activatedRoute.params.subscribe((resp: any) => {
        this.discount_id = resp.id;
      });
      this.courses = resp.courses;
      this.categories = resp.categories;
      this.showDiscount();
    });
  }

  showDiscount() {
    this.discountService
      .showDiscount(this.discount_id)
      .subscribe((resp: any) => {
        this.discount_selected = resp.discount;
        this.discount = this.discount_selected;
        this.type_campaing = this.discount_selected.type_campaing;
        this.type_discount = this.discount_selected.type_discount;
        this.discount_type = this.discount_selected.discount_type;
        this.start_date = this.discount_selected.start_date;
        this.end_date = this.discount_selected.end_date;
        this.categorie_id = this.discount_selected.categorie_id ?? '';
        this.course_id = this.discount_selected.course_id ?? '';
        this.state = this.discount_selected.state;
        if (this.discount_type == 1) {
          this.courses_selecteds = this.discount_selected.courses;
        }
        if (this.discount_type == 2) {
          console.log(this.discount_selected, 'hola mundo');
          this.categories_selecteds = this.discount_selected.categories;
        }
      });
  }

  save() {
    if (!this.discount || !this.start_date || !this.end_date) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }
    if (this.discount_type == 1 && this.courses_selecteds.length == 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR CURSOS',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }
    if (this.discount_type == 2 && this.categories_selecteds.length == 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR CATEGORIAS',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }
    let data = {
      type_discount: this.type_discount,
      discount: this.discount,
      state: this.state,
      start_date: this.start_date,
      end_date: this.end_date,
      discount_type: this.discount_type,
      type_campaing: this.type_campaing,
      courses_selecteds: this.courses_selecteds,
      categories_selecteds: this.categories_selecteds,
    };
    this.discountService.updateDiscount(data, this.discount_id).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALIDACIÓN',
          type: 'danger',
        });
        return;
      } else {
        this.toaster.open({
          text: 'LA CAMPAÑA DE DESCUENTO SE EDITO CORRECTAMENTE',
          caption: 'VALIDACIÓN',
          type: 'primary',
        });
        // this.discount = 0;
        // this.type_discount = 1;
        // this.discount_type = 1;
        // this.courses_selecteds = [];
        // this.categories_selecteds = [];
        // this.course_id = null;
        // this.categorie_id = null;
        // this.type_campaing = 1;
        // this.start_date = null;
        // this.end_date = null;
      }
    });
  }

  addCourseSelected() {
    let VALID = this.courses_selecteds.findIndex(
      (course: any) => course.id == this.course_id
    );
    if (VALID == -1) {
      let INDEX = this.courses.findIndex(
        (course: any) => course.id == this.course_id
      );
      if (INDEX != -1) {
        this.courses_selecteds.push(this.courses[INDEX]);
        this.course_id = null;
      }
    }
  }
  addCategorieSelected() {
    let VALID = this.categories_selecteds.findIndex(
      (categorie: any) => categorie.id == this.categorie_id
    );
    if (VALID == -1) {
      let INDEX = this.categories.findIndex(
        (categorie: any) => categorie.id == this.categorie_id
      );
      if (INDEX != -1) {
        this.categories_selecteds.push(this.categories[INDEX]);
        this.categorie_id = null;
      }
    }
  }

  removeCourse(i: number) {
    this.courses_selecteds.splice(i, 1);
  }
  removeCategorie(i: number) {
    this.categories_selecteds.splice(i, 1);
  }
  selectedTypeDiscount(value: any) {
    this.type_discount = value;
  }
  selectedTypeCampaing(value: any) {
    this.selectedTypeCoupon(1);
    this.type_campaing = value;
  }
  selectedTypeCoupon(value: any) {
    this.discount_type = value;
    this.courses_selecteds = [];
    this.categories_selecteds = [];
  }
}
