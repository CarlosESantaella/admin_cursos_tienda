import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(public http: HttpClient, public authservice: AuthService) {}

  listConfig() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    let URL = URL_SERVICIOS + '/coupon/config';
    this.isLoadingSubject.next(false);
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  showCoupon(course_id: string) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    let URL = URL_SERVICIOS + '/coupon/' + course_id;
    this.isLoadingSubject.next(false);
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  listCoupons(search?: any, state?: any) {
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let LINK = '?T=';
    if (search) {
      LINK += '&search=' + search;
    }
    if (state) {
      LINK += '&state=' + state;
    }
    let URL = URL_SERVICIOS + '/coupon' + LINK;
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registerCoupons(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/coupon';

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateCoupons(data: any, courseId: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/coupon/' + courseId;

    return this.http
      .put(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  deleteCoupon(courseId: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/coupon/' + courseId;

    return this.http
      .delete(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
