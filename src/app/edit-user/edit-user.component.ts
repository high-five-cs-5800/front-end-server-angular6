import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { AuthenticationService   } from "../service/auth.service";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

//  constructor() { }
  lists = [
     {value: 0, label: 'client User'},
     {value: 1, label: 'Regular User'},
     {value: 2, label: 'Admin User'}
  ];
  user: User;
  //userTemp: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService, private authService: AuthenticationService) { }
 
  ngOnInit() {
    let userId = sessionStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      title: ['', Validators.required],
      user_type: ['', Validators.required]
    });
    this.userService.getUserById(userId)
      .subscribe( data => {
         this.editForm.setValue(data);
    });
  }

  onSubmit() {
    //this.userTemp.id = this.editForm.form-control.id.value;
    //this.userTemp.title = this.editForm.form-control.title.value;
    //this.userTemp.password = this.editForm.form-control['password'].value;
    //this.userTemp.user_type = this.editForm.user_type.value;

    this.userService.updateUser(this.editForm.value)
                    .subscribe(
                        
   			data => {
                        console.log("we are here");
                        console.log(data);
          		this.router.navigate(['list-user']);
                     }
                    );
    
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
