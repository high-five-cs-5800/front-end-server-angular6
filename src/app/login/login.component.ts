import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService   } from "../service/auth.service";
import { UserService } from "../service/user.service";

import { User } from "../model/user.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //constructor() { }
  loginForm: FormGroup;
  submitted: boolean = false;
  logouted:  boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private userService: UserService ) { }
  user: User;
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.controls.username.value, 
                                      this.loginForm.controls.password.value);
    var currentUser = localStorage.getItem('accessToken');
    localStorage.setItem("username", this.loginForm.controls.username.value);
    if(currentUser != null){
        var userId = localStorage.getItem('userId');
        this.userService.getUserById(userId)
                        .subscribe( data => {
                           console.log(data);
        		   if(data.adminAccount == true) {
                                this.router.navigate(['admin-user']);
                           }
                           else{
                                this.router.navigate(['regular-user']);
                          }
      			});
    }else{
      this.invalidLogin = true;
    }
  }
  onLogout(){
    this.logouted = true;
    this.authService.logout();
    this.router.navigate(['login']);
  }
  ngOnInit() {

    this.loginForm = this.formBuilder.group( {
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
