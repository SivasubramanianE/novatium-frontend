import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const url = 'http://localhost:3000'
@Injectable({
    providedIn:'root'
})
export class userService {
  constructor(private httpclient : HttpClient) {}

    login(body:any) {
      return this.httpclient.post(url+'/user/login',body)
    }

    userReg(body:any) {
        return this.httpclient.post(url+'/user/reg',body)
    }

    cart(body:any) {
      return this.httpclient.post(url+'/user/cart',body)
    }

    proceedOrder(body:any){
      return this.httpclient.post(url+'/user/checkout',body)
    }

    


}