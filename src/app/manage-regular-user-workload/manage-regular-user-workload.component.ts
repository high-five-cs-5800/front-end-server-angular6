import { Component, OnInit } from '@angular/core';

import { AuthenticationService   } from "../service/auth.service";
import { UserService } from "../service/user.service";


import { Router } from "@angular/router";
import { Workloads } from "../model/workload.model";




@Component({
  selector: 'app-manage-regular-user-workload',
  templateUrl: './manage-regular-user-workload.component.html',
  styleUrls: ['./manage-regular-user-workload.component.css']
})
export class ManageRegularUserWorkloadComponent implements OnInit {
  workloads: Workloads[];
  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) { }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  };

  ngOnInit() {
    //sessionStorage.getItem('currentUser').userId
    let currentUser = sessionStorage.getItem('currentUser');
    //let temp = { username: string, title: string, user_type: number, id:string }
    var userId = "";
    JSON.parse(currentUser, (key,value)=>{
    	if(key === 'id')
           userId = value;
    } );

   console.log("testing: " + userId);
    //this.userService.getUserWorkload(currentUser.userId)
    //    .subscribe( data => {
    //       console.log(data);
    //});
  }

  onManageWorkload(){
    this.router.navigate(['manage-regular-user-workload']);
  }

   onDashBoard(){
    this.router.navigate(['regular-user']);

  }
}

