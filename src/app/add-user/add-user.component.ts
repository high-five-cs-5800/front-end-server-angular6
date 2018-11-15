import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../model/user.model";


import { AuthenticationService   } from "../service/auth.service";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  //constructor() { }
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService, private authService: AuthenticationService) { }
  lists = [
     {value: 0, label: 'client User'},
     {value: 1, label: 'Regular User'},
     {value: 2, label: 'Admin User'}
  ];
  user: User;
  addForm: FormGroup;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],      
      title: ['', Validators.required],
      user_type: ['', Validators.required]
    });
  };

  onSubmit(){
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  };

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  };

}
