import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import Product from 'src/app/models/product.model'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
@Input() product: Product = new Product(); 
@Output() onPurchase = new EventEmitter<number>

constructor(private router:Router){

}

getDetails(id:number){
 this.router.navigateByUrl("product/"+this.product.id)
}
Purchase(){
 this.onPurchase.emit(this.product.id);
}
}
