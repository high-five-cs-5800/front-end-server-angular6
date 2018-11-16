import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { AuthenticationService } from "./service/auth.service";
//import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
    EditWorkloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
