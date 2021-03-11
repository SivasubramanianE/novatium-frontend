import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userService } from '../SharedService/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm :FormGroup;
  constructor(private formBuilder :FormBuilder, private userservice : userService, private router :Router) { 
    this.regForm = this.formBuilder.group({
      email: ['', Validators.required],
      phonenumber:['',Validators.required],
      password: ['', Validators.required]
  });
  }

  ngOnInit() {  }
  get f(){
    return this.regForm.controls;
  }

  onSubmit(){
    if(this.regForm.invalid){
      return;
    }
    
  }
 
  checkReg(){
    if(this.regForm.controls['email'].value && this.regForm.controls['phonenumber'].value && this.regForm.controls['password'].value ){
      this.userservice.userReg(this.regForm.value).subscribe((data:any) => {
        if(data.success){
          this.router.navigate(['/login']);
        }
      });
      
      }else{
        alert("fill all fields");
    }

  }

}
