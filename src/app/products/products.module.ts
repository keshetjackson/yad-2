import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ProductNavbarComponent } from './product-navbar/product-navbar.component';
import { FormsModule } from '@angular/forms';
import { PhoneNumberPipe } from '../pipes/phone.pipe';
import { ProductsListComponent } from './products-list/ProductsListComponent';




@NgModule({
  declarations: [
    ProductComponent,
    ProductsListComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    ProductNavbarComponent,
    PhoneNumberPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ProductsListComponent
  ]
})
export class ProductsModule { }
