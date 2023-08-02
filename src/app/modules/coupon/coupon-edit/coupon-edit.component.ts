import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { Observable } from 'rxjs';
import { CouponService } from '../service/coupon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss'],
})
export class CouponEditComponent implements OnInit {
  code: any;
  discount: number = 0;
  num_use: number = 0;
  type_discount: number = 1;
  type_count: number = 1;
  type_coupon: any = 1;
  isLoading$: Observable<any>;
  categorie_id: any = '';
  course_id: any = '';

  coupon_id: any;
  state:any = 1;

  courses: any = [];
  categories: any = [];
  categories_selecteds: any = [];
  courses_selecteds: any = [];

  coupon_selected: any;

  constructor(
    public cdr: ChangeDetectorRef,
    public couponService: CouponService,
    public toaster: Toaster,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.couponService.isLoading$;
    this.activatedRoute.params.subscribe((resp: any) => {
      this.coupon_id = resp.id;
      console.log(resp.id, 'hola mundo');
    });

    this.couponService.listConfig().subscribe((resp: any) => {
      console.log(resp);
      this.courses = resp.courses;
      this.categories = resp.categories;
      this.showCoupon();
    });
  }

  showCoupon() {
    this.couponService.showCoupon(this.coupon_id).subscribe((resp: any) => {
      console.log(resp, 'hola mundo 2');
      this.coupon_selected = resp.coupon;
      this.code = this.coupon_selected.code;
      this.discount = this.coupon_selected.discount;
      this.num_use = this.coupon_selected.num_use;
      this.type_discount = this.coupon_selected.type_discount;
      this.type_count = this.coupon_selected.type_count;
      this.type_coupon = this.coupon_selected.type_coupon;
      this.categorie_id = this.coupon_selected.categorie_id ?? '';
      this.course_id = this.coupon_selected.course_id ?? '';
      this.state = this.coupon_selected.state;
      if(this.type_coupon == 1){
        this.courses_selecteds = this.coupon_selected.courses;
      }
      if(this.type_coupon == 2){
        console.log(this.coupon_selected, 'hola mundo');
        this.categories_selecteds = this.coupon_selected.categories;
        
      }
    });
  }

  save() {
    if (!this.code || !this.discount) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR TODOS LOS CAMPOS',
        caption: 'VALICACIÓN',
        type: 'danger',
      });
      return;
    }
    if (this.type_count == 2 && !this.num_use) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR UN NÚMERO DE USOS LIMITADOS',
        caption: 'VALICACIÓN',
        type: 'danger',
      });
      return;
    }
    if (this.type_coupon == 1 && this.courses_selecteds.length <= 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR AL MENOS UN CURSO',
        caption: 'VALICACIÓN',
        type: 'danger',
      });
      return;
    }
    if (this.type_coupon == 2 && this.categories_selecteds.length <= 0) {
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR AL MENOS UNA CATEGORÍA',
        caption: 'VALICACIÓN',
        type: 'danger',
      });
      return;
    }

    let data = {
      code: this.code,
      type_discount: this.type_discount,
      discount: this.discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_coupon: this.type_coupon,
      courses_selecteds: this.courses_selecteds,
      categories_selecteds: this.categories_selecteds,
      state: this.state,
    };
    console.log(this.coupon_id);
    this.couponService.updateCoupons(data, this.coupon_id).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALICACIÓN',
          type: 'danger',
        });
        return;
      } else {
        this.toaster.open({
          text: 'EL CUPÓN SE ACTUALIZO CORRECTAMENTE',
          caption: 'VALICACIÓN',
          type: 'primary',
        });
        return;
      }
    });
  }

  selectedTypeDiscount($event: any, value: any) {
    // $event.preventDefault();
    this.type_discount = value;
    this.cdr.detectChanges();
  }

  selectedTypeCount($event: any, value: number) {
    this.type_count = value;
  }

  selectCategorie($event: any) {}

  selectedTypeCoupon($event: any, value: any) {
    this.type_coupon = value;
  }
  selectCourse($event: any) {}

  addCourseSelected() {
    let VALID = this.courses_selecteds.findIndex(
      (course: any) => course.id == this.course_id
    );
    console.log(VALID);
    if (VALID == -1) {
      let INDEX = this.courses.findIndex(
        (course: any) => course.id == this.course_id
      );
      if (INDEX != -1) {
        this.courses_selecteds.push(this.courses[INDEX]);
        this.course_id = '';
      }
    }
  }

  addCategorySelected() {
    let VALID = this.categories_selecteds.findIndex(
      (categorie: any) => categorie.id == this.categorie_id
    );
    if (VALID == -1) {
      let INDEX = this.categories.findIndex(
        (category: any) => category.id == this.categorie_id
      );
      if (INDEX != -1) {
        this.categories_selecteds.push(this.categories[INDEX]);
        this.categorie_id = '';
      }
    }
  }

  removeCourse($event: any, i: number) {
    $event.preventDefault();

    this.courses_selecteds.splice(i, 1);
  }

  removeCategory($event: any, i: number) {
    $event.preventDefault();
    this.categories_selecteds.splice(i, 1);
  }
}
