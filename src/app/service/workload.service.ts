import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {workload} from "../model/workload.model";

@Injectable()
export class WorkloadService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeanstalk.com:8081/aapi/Workloads';

  getWorkloads () {
    return this.http.get<Workloads[]>(this.baseUrl);
  }

  getWorkloadById(id: string) {
    return this.http.get<Workloads>(this.baseUrl + '/' + id);
  }

  createWorkload(workload: Workloads) {
    return this.http.post(this.baseUrl, workload);
  }

  //adjust update
  updateWorkload(workload: Workloads) {
    return this.http.put(this.baseUrl + '/' + workload.id, workload);
  }

  deleteWorkload(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }


}

