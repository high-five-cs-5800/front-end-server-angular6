import { Component, OnInit } from '@angular/core';

import { AuthenticationService   } from "../service/auth.service";
import { UserService } from "../service/user.service";


import { Router } from "@angular/router";
import { Workloads } from "../model/workload.model";


import { DualListComponent } from 'angular-dual-listbox';


@Component({
  selector: 'app-manage-regular-user-workload',
  templateUrl: './manage-regular-user-workload.component.html',
  styleUrls: ['./manage-regular-user-workload.component.css']
})

export class ManageRegularUserWorkloadComponent implements OnInit {
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

  addWorkload(workload: Workloads): void {
    //add workload to the user
    this.userService.addWorkloadToUser(this.userId, workload)
        .subscribe( 
         data => {
           this.userService.deleteWorkload(workload.id).subscribe(data=>{
		this.userService.getWorkloadsWithNoId().subscribe( data => { this.workloadsPool = data; });
                this.userService.getUserWorkloads(this.userId).subscribe( data => { this.workloadsUsers = data; });
                this.router.navigate(['manage-regular-user-workload']);
           },error=>{console.log(error)});
        },
        error => {
             console.log(error);
        });

  };

  removeWorkload(workload: Workloads): void{
    //delete the workload from users
    this.userService.deleteUserWorkload(this.userId, workload)
        .subscribe( 
         data => {
	   workload.id = null;
	   workload.userAccountId = null; 
           console.log(workload.product_line);
           this.userService.createWorkload(workload).subscribe(
              data => {
	           this.userService.getWorkloadsWithNoId().subscribe( data1 => {this.workloadsPool = data1;});
	           this.userService.getUserWorkloads(this.userId).subscribe( data2 => {this.workloadsUsers = data2;});
	           this.router.navigate(['manage-regular-user-workload']);
              }
           );
        },
        error => {
             console.log(error);
        });

  }

   editWorkload(workload: Workloads): void {
    sessionStorage.removeItem("editWorkloadId");
    sessionStorage.setItem("editWorkloadId", workload.id.toString());
    this.router.navigate(['edit-regular-user-workload']);
   }


}

