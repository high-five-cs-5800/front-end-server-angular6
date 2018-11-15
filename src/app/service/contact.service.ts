import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {workload} from "../model/workload.model";

@Injectable()
export class Contacts {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeanstalk.com:8081/api/Contacts';

  getContacts () {
    return this.http.get<Contacts[]>(this.baseUrl);
  }

}
