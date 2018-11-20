import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { Workloads } from "../model/workload.model";
import { AuthenticationService   } from "../service/auth.service";



@Component({
  selector: 'app-list-workload',
  templateUrl: './list-workload.component.html',
  styleUrls: ['./list-workload.component.css']
})
export class ListWorkloadComponent implements OnInit {
  workloads: Workloads[];
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
      this.userService.getWorkloads()
      .subscribe( data => {
        this.workloads = data;
      });

  }

  addWorkload(): void {
    this.router.navigate(['add-workload']);
  };

  deleteWorkload(workload: Workloads): void {
    this.userService.deleteWorkload(workload.id)
      .subscribe( data => {
        this.workloads = this.workloads.filter(u => u !== workload);
      })
  };

 editWorkload(workload: Workloads): void {
    sessionStorage.removeItem("editWorkloadId");
    sessionStorage.setItem("editWorkloadId", workload.id.toString());
    this.router.navigate(['edit-workload']);
  };
 

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  };



}
