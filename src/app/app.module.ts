import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
// #fake-end#
import { CKEditorModule } from 'ckeditor4-angular';

import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { CategoriesListComponent } from './modules/categories/categories-list/categories-list.component';
import { CategoryAddComponent } from './modules/categories/category-add/category-add.component';
import { CategoryDeleteComponent } from './modules/categories/category-delete/category-delete.component';
import { CategoryEditComponent } from './modules/categories/category-edit/category-edit.component';
import { CouponAddComponent } from './modules/coupon/coupon-add/coupon-add.component';
import { CouponEditComponent } from './modules/coupon/coupon-edit/coupon-edit.component';
import { CouponDeleteComponent } from './modules/coupon/coupon-delete/coupon-delete.component';
import { CouponListComponent } from './modules/coupon/coupon-list/coupon-list.component';

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    //
    CKEditorModule,
    //
    ToastNotificationsModule.forRoot({
      duration: 6000,
      type: 'primary',
      position: 'top-right',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
