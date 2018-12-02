import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";

import { AuthenticationService } from "../service/auth.service";
import { UserService } from "../service/user.service";


import { first} from "rxjs/operators";
import { Router} from "@angular/router";
import { Workloads } from "../model/workload.model";


@Component({
  selector: 'app-edit-workload',
  templateUrl: './edit-workload.component.html',
  styleUrls: ['./edit-workload.component.css']
})
export class EditWorkloadComponent implements OnInit {
  username = "";
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  lists = [
    {value: 0, label: 'type 0'},
    {value: 1, label: 'type 1'},
    {value: 2, label: 'type 2'}
  ];

  lists2 = [ 
	{value: 'pre', label: 'pre'},
	{value: 'post', label: 'post'}
  ]; 
  editWorkLoadForm: FormGroup;



  ngOnInit() {
   this.username = sessionStorage.getItem('username');
   let workloadId = sessionStorage.getItem("editWorkloadId");
   sessionStorage.removeItem("editWorkloadId");
   if(!workloadId){
     alert("Invalid action.")
      this.router.navigate(['list-workload']);
      return;
   }

   this.editWorkLoadForm = new FormGroup(
      {
         id: new FormControl(),
       	 case_type: new FormControl(),
         case_purpose: new FormControl(),
         subject: new FormControl,
         product_line: new FormControl,
         archive: new FormControl,
         case_request_detail: new FormControl,
         userAccountId: new FormControl,
	 help_response_detail: new FormControl,
         keywordList: new FormArray([
            this.initKeywordList()
         ]),
          contact_info: new FormGroup({
               id: new FormControl(),
	       workloadId: new FormControl(),
               First: new FormControl(),
               Last: new FormControl(),
               email: new FormControl(),
               company: new FormControl(),
               phone_number: new FormControl()
          })
      }
   )
   this.userService.getWorkloadById(workloadId)
     .subscribe( data => {
         this.userService.getWorkloadContact(workloadId).subscribe( data1 => {
		data.contact_info = data1;
		this.userService.getWorkloadKeyWords(workloadId).subscribe( data2 => {
			data.keywordList = data2;
			var n = data.keywordList.length;
         		for(let i = 0; i < n-1; i++){
              			this.addKeyword();
          		}
         		this.editWorkLoadForm.setValue(data);
                });
         });
     });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  addKeyword(){
        const control = <FormArray>this.editWorkLoadForm.controls['keywordList'];
        control.push(this.initKeywordList());
  }

  removeKeyword(i: number) {
        const control = <FormArray>this.editWorkLoadForm.controls['keywordList'];
        control.removeAt(i);
    }


  initKeywordList(){
        return this.formBuilder.group({
          word: new FormControl(),
          id:   new FormControl(),
          workloadId: new FormControl()
        });
  }

  initContact_info(){
       return this.formBuilder.group({
          First: ['', Validators.required],
          Last: ['', Validators.required],
          email: ['', Validators.required],
          company: ['', Validators.required],
          phone_number: ['', Validators.required]
       });
  }

  onSubmit(){
          this.userService.updateWorkload(this.editWorkLoadForm.value)
                    .subscribe(data => { this.router.navigate(['list-workload']); });
  }

}
