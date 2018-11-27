import { Component, OnInit } from '@angular/core';

import { AuthenticationService   } from "../service/auth.service";
import { UserService } from "../service/user.service";


import { Router } from "@angular/router";
import { Workloads } from "../model/workload.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  workloadsPool: Workloads[];
  workloadsUsers: Workloads[];
  userId: string;
  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) { }

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
    this.userService.getWorkloadsWithNoId()
        .subscribe( data => {
           this.workloadsPool = data;
        });
    this.userService.getUserWorkloads(this.userId)
        .subscribe( data => {
           this.workloadsUsers = data;
        });


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
