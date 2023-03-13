import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service/product.service';
import Product from 'src/app/models/product.model'
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product = new Product();

  constructor(private route: ActivatedRoute, private productService: ProductService,private router:Router) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    let id = Number(productId);

    this.productService.getProductById(id).subscribe((product: Product) => {
      this.product = product;
    });
  }

  goHome(){
    this.router.navigateByUrl("");
  }
}
