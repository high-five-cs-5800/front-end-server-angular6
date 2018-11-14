import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

import {AdminUserComponent} from "./admin-user/admin-user.component"; 
import {RegularUserComponent} from "./regular-user/regular-user.component"; 
import {ClientUserComponent} from "./client-user/client-user.component"; 




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'admin-user', component: AdminUserComponent },
  { path: 'regular-user', component: RegularUserComponent },
  { path: 'client-user', component: ClientUserComponent },
  { path : '', component : LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
