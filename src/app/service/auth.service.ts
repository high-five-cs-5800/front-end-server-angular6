import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from  "../model/user.model";

@Injectable()

export class AuthenticationService {
      API_URL = "http://back-end-serer-env2.uyvzpgtkte.us-east-1.elasticbeanstalk.com:8081/api/UserAccounts";

      constructor(private http: HttpClient) { }

      login(username: string, password: string) {

         //console.log("in login " + username);
         //console.log("in login " + password);
         this.http.post<any>(this.API_URL + '/' + 'login', {username: username, password: password})
                  .subscribe(data => {
                                //console.log(data);
				if(data && data.id && data.userId){
				   console.log("testing id: " + data.userId + ", token: " + data.id);
                                   localStorage.setItem('accessToken', data.id);
                                   localStorage.setItem('userId', data.userId);
                                }
                                else{
                                   return throwError({ error: { message: 'Username or password is incorrect' } });
 				}
                             }
                    );

      }
      logout() { 
        if(localStorage.getItem('accessToken')!=null){
            this.http.post<any>(this.API_URL + '/' + 'logout?', {access_token: localStorage.getItem('accessToken')});
        }
        localStorage.clear();
      }
}
