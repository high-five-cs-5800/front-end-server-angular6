import { Component, OnInit } from '@angular/core';

import { AuthenticationService   } from "../service/auth.service";
import { UserService } from "../service/user.service";


import { Router } from "@angular/router";
import { Workloads } from "../model/workload.model";
import { Keyword } from "../model/keyword.model";




@Component({
  selector: 'app-manage-regular-user-workload',
  templateUrl: './manage-regular-user-workload.component.html',
  styleUrls: ['./manage-regular-user-workload.component.css']
})

export class ManageRegularUserWorkloadComponent implements OnInit {
  workloadsPool: Workloads[];
  workloadsUsers: Workloads[];
  workloadsData = new Array<Workloads>();
  workloadsArray = new Array<Workloads>();
  userId: string;
  username = "";
  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) { }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  };;

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
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
           this.workloadsData = data;
        //this.filterArchive();
        });


  }

  onSearch(){
    this.router.navigate(['search']);
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
	   let id =  data['id'];
	   let old_id = workload.id;
           this.userService.getWorkloadContact(workload.id).subscribe( input => {
                workload.contact_info = input;
		workload.contact_info.id = null;
           	this.userService.getWorkloadKeyWords(workload.id).subscribe( input2 => { 
			workload.keywordList = input2;
			this.userService.getWorkloadKeyWords(workload.id).subscribe( input3 => { 
				workload.keywordList = input3;
				this.userService.postWorkloadContact(id, workload).subscribe(data2  => { 
					this.userService.postWorkloadKeywords(id, workload).subscribe(data3 => {
						  this.userService.getWorkloadKeyWords(old_id).subscribe( input33 => {
							//keywords: keyWord[];
							let keywords = input33;
							for(id in keywords){
							   this.userService.clearKeyWords(keywords[id].id);
							}
					          this.userService.deleteWorkload(old_id).subscribe(data=>{
				                  	this.userService.getWorkloadsWithNoId().subscribe( data => 
								{ this.workloadsPool = data; }); 
				                  	this.userService.getUserWorkloads(this.userId).subscribe( data => 
								{ this.workloadsUsers = data; });
				                  	this.router.navigate(['manage-regular-user-workload']);
                                                  })
                                                  })
 					})
				})
			})
		})

            })
     	});

  };

  removeWorkload(workload: Workloads): void{
    this.userService.getWorkloadContact(workload.id).subscribe( input =>  {
                workload.contact_info = input;
                workload.contact_info.id = null;
                this.userService.getWorkloadKeyWords(workload.id).subscribe( input2 => {
                        workload.keywordList = input2;
                        let keywords = input2
			for(var i = 0; i < workload.keywordList.length; i++){
			     this.userService.clearKeyWords(workload.keywordList[i].id);
                        }
				this.userService.deleteUserWorkload(this.userId, workload).subscribe( data => {
					workload.id = null;
					workload.userAccountId = null;
					this.userService.createWorkload(workload).subscribe( data => {
						let id =  data['id'];
	                	                this.userService.postWorkloadContact(id, workload).subscribe(data2 => {
                	                	        this.userService.postWorkloadKeywords(id, workload).subscribe(data3 => {
                                        	                this.userService.getWorkloadsWithNoId().subscribe( data => { this.workloadsPool = data; });
                                                	        this.userService.getUserWorkloads(
									this.userId).subscribe( 
										data => { this.workloadsUsers = data; });
                                                        	this.router.navigate(['manage-regular-user-workload']);
                                                  	})
                                        	})

                                        })
			        })
                })

            },
            error => {
             	console.log(error);
            });

  }

   editWorkload(workload: Workloads): void {
    sessionStorage.removeItem("editWorkloadId");
    sessionStorage.setItem("editWorkloadId", workload.id);
    this.router.navigate(['edit-regular-user-workload']);
   }

  filterArchive(): void{
   console.log(this.workloadsData.length);
   for(let i = 0; i < this.workloadsData.length; i++)
   {
     //console.log(this.workloadsData[i]);
     if(this.workloadsData[i].archive == null)
     { 
	//console.log(this.workloadsData[i]);
	this.workloadsArray.push(this.workloadsData[i]);
     }
   }
   //this.workloadsPool = this.workloadsArray;
   //console.log(this.workloadsPool);
 }

}

