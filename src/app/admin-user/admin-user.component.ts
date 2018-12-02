import { Component, OnInit } from '@angular/core';
import { AuthenticationService   } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  username = "";
  constructor(private authService: AuthenticationService, private router: Router) { }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
  ngOnInit() {
 	this.username = sessionStorage.getItem('username');
  }

}
