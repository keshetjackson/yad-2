import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Product from 'src/app/models/product.model'
import { ProductService } from 'src/app/services/product-service/product.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Output() onCreate = new EventEmitter<Product>;

  constructor(private productService: ProductService,private router:Router) {}
  async onSubmit(name:string,description:string,image:string,price:string,city:string,phone:string){
    let parsePrice = parseInt(price);
    let parsedPhone = parseInt(phone);
    let p: Product = new Product(name,description,image,parsePrice,city,parsedPhone);
    await this.productService.addProductAndNotify(p);
    await this.router.navigateByUrl("");
  }
}
