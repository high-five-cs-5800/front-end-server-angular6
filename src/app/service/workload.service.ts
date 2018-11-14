import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {User} from "../model/user.model";

@Injectable()
export class WorkloadService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeansta$';



}

