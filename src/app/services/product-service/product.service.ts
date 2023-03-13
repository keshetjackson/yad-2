// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";
// import { io } from "socket.io-client";
// import Product from "src/app/models/product.model";

// @Injectable()
// class ProductService {
    
//   socket = io("http://localhost:8080");

//   products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

//   getData(){
//     this.socket.on('getData', (products: Product[])=>{
//         this.products$.next(products);
//     });

//     return this.products$.asObservable();
//   }

//   addItem(){
//     this.socket.emit('newItem', { title: "new item title", description: "new item description" });
//   }

//   deleteItem(id:string){
//     this.socket.emit('itemDelete', id);
//   }

// }

// export default ProductService;


import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IdService } from '../id-service/id.service';
import Product from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly api = 'http://localhost:3000/products';

  constructor(
    private readonly http: HttpClient,
    private readonly idService: IdService,
  ) {}

  productAdded = new EventEmitter<Product>();
  productAddedSubject = new Subject<Product>();

  // ...

  addProductAndNotify(product: Product): void {
    this.addProduct(product).subscribe({
      next: (newProduct: Product) => {
        this.productAdded.emit(newProduct);
        this.productAddedSubject.next(newProduct); // emit the event using the subject
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.idService.getNextId().pipe(
      map((id: number) => ({ ...product, id })),
      switchMap((newProduct: Product) =>
        this.http.post<Product>(this.api, newProduct),
      ),
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}


