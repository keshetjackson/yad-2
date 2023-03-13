import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsListComponent } from "./products/products-list/ProductsListComponent";
import { ProductComponent } from './products/product/product.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

const routes: Routes = [
  {path: '', component:ProductsListComponent},
  {path: 'product/:id', component:ProductDetailsComponent},
  {path: 'create', component:ProductFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
