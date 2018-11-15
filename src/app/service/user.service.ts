

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeanstalk.com:8081/api/UserAccounts';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    let body =  { username: user.username, password: user.password, title: user.title, user_type: user.user_type } ; 
    return this.http.put(this.baseUrl + '/update?where=' +  {id: user.id} + body);
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

}

