import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { AuthenticationService } from "./service/auth.service";

import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from "./list-user/list-user.component";
import { UserService } from "./service/user.service";

import { AdminUserComponent } from './admin-user/admin-user.component';
import { RegularUserComponent } from './regular-user/regular-user.component';
import { ClientUserComponent } from './client-user/client-user.component';

import { AddWorkloadComponent } from './add-workload/add-workload.component';
import { ListWorkloadComponent } from './list-workload/list-workload.component';
import { EditWorkloadComponent } from './edit-workload/edit-workload.component';
import { ConfigComponent } from './config/config.component';
import { ManageRegularUserWorkloadComponent } from './manage-regular-user-workload/manage-regular-user-workload.component';

import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { EditRegularUserWorkloadComponent } from './edit-regular-user-workload/edit-regular-user-workload.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,

    AdminUserComponent,
    RegularUserComponent,
    ClientUserComponent,

    AddWorkloadComponent,
    ListWorkloadComponent,
    EditWorkloadComponent,
    ConfigComponent,
    ManageRegularUserWorkloadComponent,
    EditRegularUserWorkloadComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularDualListBoxModule
  ],
  providers: [
    AuthenticationService, UserService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
