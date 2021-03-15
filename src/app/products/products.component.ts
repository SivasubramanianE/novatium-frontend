import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../SharedService/userService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  totalAmount =0;
  userDetails : any;
  productList = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    },
    {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
    },
    {
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
    },
    {
        "id": 5,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
    }
]
  
  
  cartProductList = Array();

  constructor(private userservice : userService, private router :Router) { }

  ngOnInit(): void {
    var aValue:any;
    aValue =localStorage.getItem('userdetails');
    if(aValue){
      this.userDetails = JSON.parse(aValue);
      if(this.userDetails.dateModifided){
      var date = new Date(this.userDetails.dateModifided);
      var dateCheck = date.setDate(date.getDate()+1);
      
      if(this.userDetails.cart && new Date(dateCheck) > new Date()){
        this.cartProductList = this.userDetails.cart;
        this.totalAmt();
      }
    } 
   }
  }

 
 
  addProductToCart(product:any) {
    const productExistInCart = this.cartProductList.find(({title}) => title === product.title);
    
    if (!productExistInCart) {
      this.cartProductList.push({...product, qty:1,nprice:1*product.price});
    }else{
      productExistInCart.qty += 1;
      productExistInCart.nprice = productExistInCart.qty *productExistInCart.price;
      
    }
    this.totalAmt();
  }

  totalAmt(){
    this.totalAmount =  this.cartProductList.map(data => data.nprice).reduce((acc, data) => data + acc);
    }

  checkout(){
    var aValue:any;
    aValue= localStorage.getItem('userdetails');
    if(this.totalAmount === 0 && this.cartProductList.length == 0){
      return alert("Please add product in cart")
    }
    
    let user =JSON.parse(aValue);
    let jsonSend = {
      'id':user._id,
      'cart':this.cartProductList
    }

    user['cart'] = this.cartProductList;
    user['totalAmount'] = this.totalAmount;
    user['dateModifided'] = new Date();

    localStorage.setItem("userdetails", JSON.stringify(user));

    
    this.userservice.cart(jsonSend).subscribe((result:any)=>{
      if(result){
        this.router.navigate(['/cart']);
      }
    })
  }

}
