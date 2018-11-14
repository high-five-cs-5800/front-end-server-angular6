import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end-agular6-express3';
  userForm = new FormGroup({
     username: new FormControl(),
     password: new FormControl(),
     user_type: new FormControl(),
     title: new FormControl(),
  });
  createUserForm(){
    this.userForm = this.formBuilder.group({
     username: '',
     password: '',
     user_type: '',
     title: '',	
    });
  }
  constructor(private formBuilder: FormBuilder) {
	this.createUserForm();
  }

}


