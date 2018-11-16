import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User}        from "../model/user.model";
import { Workloads }  from "../model/workload.model";
import { Contact }  from "../model/contact.model";
import { Keyword }  from "../model/keyword.model";



@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeanstalk.com:8081/api/';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + 'UserAccounts');
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + 'UserAccounts/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + 'UserAccounts', user);
  }

  updateUser(user: User) {
    //let body = { username: user.username, password: user.password, title: user.title, user_type: user.user_type };
    return this.http.put(this.baseUrl + 'UserAccounts' + '/update?where=', user);
    //return this.http.put(this.baseUrl + '/update?where=' + {id: user.id} +  body);
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + 'UserAccounts/' + id);
  }

  createWorkload(workload: Workloads) {
    return this.http.post(this.baseUrl + 'Workloads', workload);
  }

}

