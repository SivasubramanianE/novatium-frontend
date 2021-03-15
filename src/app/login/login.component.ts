import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from '../SharedService/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup;
  submitted = false;
  flagsCheck = false;
  message = "";
  constructor(private formBuilder :FormBuilder, private userservice : userService, private router :Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  ngOnInit() {
    localStorage.clear();
    }
  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    
  }
 
   checkLogin(){
     this.flagsCheck = true;
    if(this.loginForm.controls['email'].value  && this.loginForm.controls['password'].value){
      this.userservice.login(this.loginForm.value).subscribe((result:any)=>{
        if(result.success){
          localStorage.setItem("userdetails", JSON.stringify(result.data));
         this.router.navigate(['/product']);
        }else{
         
        }
      },
      error => {
        alert("Error in Login");
    })
      
    }else{
      alert("email or password is incorrect");
    }

  }

}
