import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
importi {workload} from "../model/workload.model";

@Injectable()
export class Keyword {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeanstalk.com:8081/api/Keyword';

  getKeyword () {
    return this.http.get<Keyword[]>(this.baseUrl);
  }
