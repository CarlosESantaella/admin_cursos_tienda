import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  listUsers(search?:any, state?:any){
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authservice.token}`
    });
    let LINK = "?T=";
    if(search){
      LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;
    }
    let URL = URL_SERVICIOS+'/users'+LINK;
    return this.http.get(URL, {
      headers: headers
    })
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  register(data:any){

    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authservice.token}`
    });

    let URL = URL_SERVICIOS+'/users';

    return this.http.post(URL, data,{
      headers: headers
    })
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );


  }

  update(data:any, userId:string){
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authservice.token}`
    });
    console.log([data, 'hola mundo']);
    let URL = URL_SERVICIOS+'/users/'+userId;

    return this.http.post(URL, data, {
      headers: headers
    })
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteUser(userId:string){
    this.isLoadingSubject.next(true);

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authservice.token}`
    });
    
    let URL = URL_SERVICIOS+'/users/'+userId;

    return this.http.delete(URL, {
      headers: headers
    })
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
