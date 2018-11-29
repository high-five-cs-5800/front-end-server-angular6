import { Component, OnInit } from '@angular/core';

import { AuthenticationService   } from "../service/auth.service";
import { UserService } from "../service/user.service";
//import { KeywordService } from "../service/keyword.service";

import { Router } from "@angular/router";
import { Workloads } from "../model/workload.model";
import { Keyword } from "../model/keyword.model";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keywordPool: Keyword[];
  workloadsPool: Workloads[];
  workloadsUsers: Workloads[];
  userId: string;
  subForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService, private router: Router, private userService: UserService) { }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  };

  ngOnInit() {
    let currentUser = sessionStorage.getItem('currentUser');
    JSON.parse(currentUser, (key,value)=>{
        if(key === 'userId')
           this.userId = value;
    });
    this.subForm = this.formBuilder.group({
      search_keyword: ['', Validators.required]
    });


  }

  onSubmit(){
   var word = this.subForm.value;
   console.log("Clicked");
   console.log(word);
   // this.userService.getKeywordsWithWord(word)
   //     .subscribe( data => {
   //        this.keywordPool = data;
   //     });
   // for(let items of this.keywordPool)
   // {
   //     var id = items.word;
   //     this.workloadUsers.push(this.userService.getWorkloadById(id));
   // }
  }


  onManageWorkload(){
    this.router.navigate(['manage-regular-user-workload']);
  }

  onDashBoard(){
    this.router.navigate(['regular-user']);

  }

  onSearch(){
    this.router.navigate(['search']);
  }

}
