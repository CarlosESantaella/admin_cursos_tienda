import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponService } from '../service/coupon.service';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss'],
})
export class CouponAddComponent implements OnInit {
  code: any;
  discount: number = 0;
  num_use: number = 0;
  type_discount: number = 1;
  type_count: number = 1;
  type_coupon: any = 1;
  isLoading$: Observable<any>;
  categorie_id: any = '';
  course_id: any = '';

  courses: any = [];
  categories: any = [];
  categories_selecteds: any = [];
  courses_selecteds: any = [];

  constructor(
    public cdr: ChangeDetectorRef,
    public couponService: CouponService,
    public toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.couponService.isLoading$;
    this.couponService.listConfig().subscribe((resp: any) => {
      console.log(resp);
      this.courses = resp.courses;
      this.categories = resp.categories;
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
    if(this.type_count == 2 && !this.num_use){
      this.toaster.open({
        text: 'NECESITAS INGRESAR UN NÚMERO DE USOS LIMITADOS',
        caption: 'VALICACIÓN',
        type: 'danger',
      });
      return;
    }
    if(this.type_coupon == 1 && this.courses_selecteds.length <= 0){
      this.toaster.open({
        text: 'NECESITAS SELECCIONAR AL MENOS UN CURSO',
        caption: 'VALICACIÓN',
        type: 'danger',
      });
      return;
    }
    if(this.type_coupon == 2 && this.categories_selecteds.length <= 0){
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
    };
    this.couponService.registerCoupons(data).subscribe((resp: any) => {
      console.log(resp);
      if(resp.message == 403){
        this.toaster.open({
          text: resp.message_text,
          caption: 'VALICACIÓN',
          type: 'danger',
        });
        return;
      }else{
        this.toaster.open({
          text: "EL CUPÓN SE REGISTRO CORRECTAMENTE",
          caption: 'VALICACIÓN',
          type: 'primary',
        });
        this.code = '';
        this.discount = 0;
        this.num_use = 0;
        this.type_discount = 1;
        this.type_count = 1;
        this.type_coupon = 1;
        this.categorie_id = '';
        this.course_id = '';
        this.courses_selecteds = [];
        this.categories_selecteds = [];
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
    if(VALID == -1){

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
    if(VALID == -1){

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
