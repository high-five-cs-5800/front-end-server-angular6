import { Component, OnInit } from '@angular/core';
import { AuthenticationService   } from "../service/auth.service";
import { Router } from "@angular/router";




@Component({
  selector: 'app-client-user',
  templateUrl: './client-user.component.html',
  styleUrls: ['./client-user.component.css']
})

export class ClientUserComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router ) { }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  username="";

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

}
