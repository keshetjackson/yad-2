import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.css']
})
export class ProductNavbarComponent {
@Output() sortPrice = new EventEmitter();
@Output() sortDate = new EventEmitter();

onPrice(){
  this.sortPrice.emit();
}
onDate(){
  this.sortDate.emit();
}
}
