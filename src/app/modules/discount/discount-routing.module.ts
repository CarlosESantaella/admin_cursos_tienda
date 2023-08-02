import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountComponent,
    children: [
      {
        path: 'list',
        component: DiscountListComponent
      },
      {
        path: 'registro',
        component: DiscountAddComponent
      },
      {
        path: 'list/editar/:id',
        component: DiscountEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
