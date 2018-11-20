import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

import { AddWorkloadComponent } from "./add-workload/add-workload.component";
import { ListWorkloadComponent } from "./list-workload/list-workload.component";
import { EditWorkloadComponent } from "./edit-workload/edit-workload.component";

import { AdminUserComponent } from "./admin-user/admin-user.component"; 
import { RegularUserComponent} from "./regular-user/regular-user.component"; 
import { ClientUserComponent } from "./client-user/client-user.component"; 

import { ManageRegularUserWorkloadComponent } from './manage-regular-user-workload/manage-regular-user-workload.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
 
  { path: 'add-workload', component: AddWorkloadComponent },
  { path: 'edit-workload', component: EditWorkloadComponent },
  { path: 'list-workload', component: ListWorkloadComponent },

  { path: 'admin-user', component: AdminUserComponent },
  { path: 'regular-user', component: RegularUserComponent },
  { path: 'client-user', component: ClientUserComponent },

  { path: 'manage-regular-user-workload', component: ManageRegularUserWorkloadComponent },

  { path : '', component : LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
