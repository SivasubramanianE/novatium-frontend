import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../SharedService/userService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private userservice : userService, private router :Router) { }

  ngOnInit(): void {
    var aValue:any;
    aValue =localStorage.getItem('userdetails');
    this.userDetails = JSON.parse(aValue);
    if(this.userDetails.cart){
      this.cartProductList = this.userDetails.cart;
      this.totalAmt();
    }
     
    
  }

  totalAmount =0;
  userDetails : any;
  productList = [
    {name: 'FunKo toy', price: 1200},
    {name: 'Rider helmet', price: 4000},
    {name: 'sport gloves', price: 99},
    {name: 'Sheep wool', price: 300}
   ];
  
  
  cartProductList = [{'name': "", 'price': 0,'qty':0,'nprice':0}];
 
  addProductToCart(product:any) {
    const productExistInCart = this.cartProductList.find(({name}) => name === product.name);
    
    if (!productExistInCart) {
      this.cartProductList.push({...product, qty:1,nprice:1*product.price});
    }else{
      productExistInCart.qty += 1;
      productExistInCart.nprice = productExistInCart.qty *productExistInCart.price;
      
    }
    this.totalAmt();
  }

  totalAmt(){
    this.cartProductList.map((data:any)=>{
      this.totalAmount+= data.nprice;
    })
  }

  checkout(){
    var aValue:any;
    aValue= localStorage.getItem('userdetails');
    if(this.cartProductList.length === 0){
      return alert("Please add product in cart")
    }
    var remove = this.cartProductList.filter(data =>data.price == 0)
  
    remove.length > 0? this.cartProductList.unshift():this.cartProductList;
    let user =JSON.parse(aValue);
    let jsonSend = {
      'id':user._id,
      'cart':this.cartProductList
    }

    user['cart'] = this.cartProductList;
    user['totalAmount'] = this.totalAmount;

    localStorage.setItem("userdetails", JSON.stringify(user));

    
    this.userservice.cart(jsonSend).subscribe((result:any)=>{
      if(result){
        this.router.navigate(['/cart']);
      }
    })
  }

}
