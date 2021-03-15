import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../SharedService/userService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( private userservice : userService, private router :Router) { }
  totalAmount =0;
  userDetails : any;
  cartProductList = [];
  ngOnInit(): void {
    var aValue:any;
    aValue =localStorage.getItem('userdetails');
    this.userDetails = JSON.parse(aValue);
  }

  proceed(){
    let checkoutDetails ={
      'totalproducts' :this.userDetails.cart.length,
      'cart' :this.userDetails.cart,
      'email' :this.userDetails.email,
      'totalAmount' :(this.userDetails.totalAmount).toFixed(2),
      'id':this.userDetails. _id,
      'status':'proccessing',
      'dateadded' : new Date()
    }

    this.userservice.proceedOrder(checkoutDetails).subscribe((result:any)=>{
      if(result.success){
        var aValue:any;
    aValue= localStorage.getItem('userdetails');
    let user =JSON.parse(aValue);
    user['cart'] = [];
    user['totalAmount'] = 0;
    user['dateModifided'] = new Date();

    localStorage.setItem("userdetails", JSON.stringify(user));
      alert("Hurrah!! Order Placed");
      this.router.navigate(['/product']);
      }
    })
    
    
    
  }
}
