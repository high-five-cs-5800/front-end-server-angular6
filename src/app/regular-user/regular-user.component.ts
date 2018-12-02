import { Component, OnInit } from '@angular/core';
import { AuthenticationService   } from "../service/auth.service";
import { Router } from "@angular/router";




@Component({
  selector: 'app-regular-user',
  templateUrl: './regular-user.component.html',
  styleUrls: ['./regular-user.component.css']
})
export class RegularUserComponent implements OnInit {
  username = "";
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
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
