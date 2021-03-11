import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
  totalAmount =0;
  userDetails : any;
  cartProductList = [];
  ngOnInit(): void {
    var aValue:any;
    aValue =localStorage.getItem('userdetails');
    this.userDetails = JSON.parse(aValue);
  }

}
