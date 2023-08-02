import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listConfig() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    let URL = URL_SERVICIOS + '/course/config';
    this.isLoadingSubject.next(false);
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  showCourse(course_id: string) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    let URL = URL_SERVICIOS + '/course/' + course_id;
    this.isLoadingSubject.next(false);
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  listCourses(search?: any, state?: any) {
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
    let URL = URL_SERVICIOS + '/course' + LINK;
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registerCourses(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course';

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  uploadVideo(data: any, course_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course/upload_video/' + course_id;

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateCourses(data: any, courseId: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course/' + courseId;

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  deleteCourses(courseId: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course/' + courseId;

    return this.http
      .delete(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  listSections(course_id:any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    let URL = URL_SERVICIOS + '/course-section?course_id='+course_id;
    this.isLoadingSubject.next(false);
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  registerSection(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-section';

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  updateSection(data: any, section_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-section/' + section_id;

    return this.http
      .put(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  deleteSection(section_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-section/' + section_id;

    return this.http
      .delete(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  listClases(clase_id:any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    let URL = URL_SERVICIOS + '/course-clases?course_section_id='+clase_id;
    this.isLoadingSubject.next(false);
    return this.http
      .get(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  registerClase(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-clases';

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  updateClase(data: any, clase_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-clases/' + clase_id;

    return this.http
      .put(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  deleteClase(clase_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-clases/' + clase_id;

    return this.http
      .delete(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  uploadVideoClase(data: any, clase_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-clases/upload_video/' + clase_id;

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  registerClaseFile(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-clases-file';

    return this.http
      .post(URL, data, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  deleteClaseFile(file_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authservice.token}`,
    });
    let URL = URL_SERVICIOS + '/course-clases-file/' + file_id;

    return this.http
      .delete(URL, {
        headers: headers,
      })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
