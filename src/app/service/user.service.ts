import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User}        from "../model/user.model";
import { Workloads }  from "../model/workload.model";
import { Contact }  from "../model/contact.model";
import { Keyword }  from "../model/keyword.model";

 const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      
  };


@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeanstalk.com:8081/api/';
  testfile: string;
  configUrl = 'assets/config.json';
  us
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
    return this.http.post(this.baseUrl + 'UserAccounts/update?where[id]=' + user.id, { username: user.username, title: user.title, user_type: user.user_type }, httpOptions);

  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + 'UserAccounts/' + id);
  }

  createWorkload(workload: Workloads) {
    return this.http.post(this.baseUrl + 'Workloads', workload);
  }

  getWorkloads() {
    return this.http.get<Workloads[]>(this.baseUrl + 'Workloads');
  }
  
  	getWorkloadsWithNoId(){
    		return this.http.get<Workloads[]>(this.baseUrl + 'Workloads?filter=%7B%22where%22%3A%20%7B%22userAccountId%22%3A%20null%20%7D%20%7D');
  	}


  	getWorkloadById(id: string) {
    		return this.http.get<Workloads>(this.baseUrl + 'Workloads/' + id);
  	}

  	deleteWorkload(id: string) {
    		return this.http.delete(this.baseUrl + 'Workloads/' + id);
  	}

  	updateWorkload(workload: Workloads){
    		for(var item in workload.keywordList){

			workload.keywordList[item].id = workload.userAccountId;
 			workload.keywordList[item].workloadId = workload.id;
    		}

    		return this.http.post(this.baseUrl + 'Workloads/update?where[id]=' + workload.id, { 
                                                                                        case_type: workload.case_type, 
                                                                                        case_purpose: workload.case_purpose,
                                                                                        subject: workload.subject,
                                                                                        product_line: workload.product_line,
                                                                                        archive: workload.archive,
                                                                                        case_request_detail: workload.case_request_detail,
                                                                                        help_response_detail: workload.help_response_detail,
                                                                                        id: workload.id,
                                                                                        userAccountId: workload.userAccountId,
                                                                                        keywordList: workload.keywordList,
                                                                                        contact_info: workload.contact_info
                                                                                      }
                          , httpOptions);
  	}

   	addWorkloadToUser(id: string, workload:Workloads){
		//console.log("call add");
	    	return this.http.post(this.baseUrl + 'UserAccounts/' + id + '/workloadList', {
                                                                                        case_type: workload.case_type,
                                                                                        case_purpose: workload.case_purpose,
                                                                                        subject: workload.subject,
                                                                                        product_line: workload.product_line,
                                                                                        archive: workload.archive,
                                                                                        case_request_detail: workload.case_request_detail,
                                                                                        help_response_detail: workload.help_response_detail,
                                                                                        userAccountId: id
                                                                                     }, httpOptions);


   	}

  	getUserWorkloads(id: string){
    		return this.http.get<Workloads[]>(this.baseUrl + 'UserAccounts/' + id +'/workloadList', httpOptions);
  	}
  
	deleteUserWorkload(id: string, workload: Workloads){
   		return this.http.delete(this.baseUrl + 'UserAccounts/' + id +'/workloadList/' + workload.id, httpOptions);

  	}

	postWorkloadContact(id: string, workload:Workloads){
                workload.contact_info.workloadId = id;
		return this.http.post(this.baseUrl + 'Workloads/' + id + '/contact_info/', workload.contact_info
                , httpOptions);

        }

	postWorkloadKeywords(id:string, workload:Workloads){
		for(var item in workload.keywordList){
			workload.keywordList[item].id = workload.userAccountId;
                        workload.keywordList[item].workloadId = workload.id;

                }
		return this.http.post(this.baseUrl + 'Workloads/' + id + '/keywordList/', workload.keywordList
                , httpOptions);
	}

	getWorkloadContact(id: string){
		return this.http.get<Contact>(this.baseUrl + 'Workloads/' + id +'/contact_info', httpOptions);
        }
	
	getWorkloadKeyWords(id: string){
               	return this.http.get<Keyword[]>(this.baseUrl + 'Workloads/' + id +'/keywordList', httpOptions);
        }

	clearKeyWords(id: string){
		 return this.http.delete(this.baseUrl + 'Keywords/' + id, httpOptions);
	
	}
       
        getKeywords(){
                 return this.http.get<Keyword[]>(this.baseUrl +  'Keywords');
	}

	getKeywordsWithWord(words: string){
                return this.http.get<Keyword[]>(this.baseUrl +'Keywords?filter=%7B%22where%22%3A%20%7B%22word%22%3A%22' + words + '%22%7D%7D');
        }


}
