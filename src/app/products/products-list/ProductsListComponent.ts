import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product.service';
import Product from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{
  products: Product[] = [];
  errorMessage: string = "error";
  sortBy: string = "";
  priceSort: boolean = false;
  dateSort: boolean = false;
  productAddedSubscription!: Subscription;


  constructor(private productService: ProductService) {
    productService.getProducts()
      .subscribe({
        next: (data => {
          this.products = data as Product[];
        }),
        error: (error => {
          this.errorMessage = "error on data loading";
        })
      });
  }
  sort(): void {
    if(this.sortBy === "price") this.sortByPrice();
    if(this.sortBy === "date") this.sortByDate();
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data => {
        this.products = data as Product[];
      }),
      error: (error => {
        this.errorMessage = "error on data loading";
      })
    });
    this.productAddedSubscription = this.productService.productAddedSubject.subscribe({
      next: (newProduct: Product) => {
        this.products.push(newProduct as Product);
      }
    });
  }

  onSortChange(sortBy: string | null) {
    if (sortBy === 'price') {
      this.sortByPrice();
    } else if (sortBy === 'date') {
      this.sortByDate();
    }
  }

  sortByPrice() {
    if (this.priceSort)
      this.products = this.products.sort((a, b) => a.price - b.price);

    if (!this.priceSort)
      this.products = this.products.sort((a, b) => b.price - a.price);
    this.priceSort = !this.priceSort;

  }

  sortByDate() {
    if (this.dateSort)
      this.products = this.products.sort((a, b) => new Date(a.published).getTime() - new Date(b.published).getTime());

    if (!this.dateSort)
      this.products = this.products.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
    this.dateSort = !this.dateSort;

  }




  handlePurchase(id: number) {
    this.productService.deleteProduct(id)
      .subscribe({
        next: (data => {
          this.products = this.products.filter((p) => p.id != id);
        }),
        error: (error) => {
          this.errorMessage = "delete failed";
        }
      });
  }
}

