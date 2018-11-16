import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";

import { AuthenticationService } from "../service/auth.service";
import { UserService } from "../service/user.service";


import { first} from "rxjs/operators";
import { Router} from "@angular/router";
import { Workloads } from "../model/workload.model";

//import { Keyword } from "../model/keyword.model";
//import { Contact } from "../model/contact.model";

@Component({
  selector: 'app-add-workload',
  templateUrl: './add-workload.component.html',
  styleUrls: ['./add-workload.component.css']
})

export class AddWorkloadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  lists = [
    {value: 0, label: 'type 0'},
    {value: 1, label: 'type 1'},
    {value: 2, label: 'type 2'}
];


  //workload: Workloads;
  addWorkLoadForm: FormGroup;

  ngOnInit() {
    this.addWorkLoadForm = new FormGroup(
      {
       	 case_type: new FormControl(),
         case_purpose: new FormControl(),
         subject: new FormControl,
         product_line: new FormControl,
         archive: new FormControl,
         case_request_detail: new FormControl,
         _keywordList: new FormArray([
            this.initKeywordList()
         ]),
          _contact_info: new FormGroup({
               First: new FormControl(),
               Last: new FormControl(),
               email: new FormControl(),
               company: new FormControl(),
               phone_number: new FormControl()
          })
          //_contact_info =  this.initContact_info()
      }
    )

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  addKeyword(){
        const control = <FormArray>this.addWorkLoadForm.controls['_keywordList'];
        control.push(this.initKeywordList());
  }

  removeKeyword(i: number) {
        const control = <FormArray>this.addWorkLoadForm.controls['_keywordList'];
        control.removeAt(i);
    }


  initKeywordList(){
        return this.formBuilder.group({
           word: ["", Validators.required]
        });
  }



  initContact_info(){
       return this.formBuilder.group({
          First: ['', Validators.required],
          Last: ['', Validators.required],
          email: ['', Validators.required],
          company: ['', Validators.required],
          phone_number: ['', Validators.required]
       });
  }

  onSubmit(){
      console.log("fired submit");
      this.userService.createWorkload(this.addWorkLoadForm.value)
          .subscribe( data => {
              this.router.navigate(['client-user']);
           });
  }

}
