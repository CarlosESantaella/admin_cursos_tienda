import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryService } from './service/category.service';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
    CategoryAddComponent,
    CategoryDeleteComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
  ],
  providers: [
    CategoryService
  ]
})
export class CategoriesModule { }
