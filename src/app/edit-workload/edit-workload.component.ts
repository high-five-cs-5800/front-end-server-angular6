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

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  lists = [
    {value: 0, label: 'type 0'},
    {value: 1, label: 'type 1'},
    {value: 2, label: 'type 2'}
  ];
 
  editWorkLoadForm: FormGroup;



  ngOnInit() {

   let workloadId = sessionStorage.getItem("editWorkloadId");
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
         _keywordList: new FormArray([
            this.initKeywordList()
         ]),
          _contact_info: new FormGroup({
               First: new FormControl(),
               Last: new FormControl(),
               email: new FormControl(),
               company: new FormControl(),
               phone_number: new FormControl()
          })
          //_contact_info =  this.initContact_info()
      }
    )
   this.userService.getWorkloadById(workloadId)
     .subscribe( data => {
         console.log("testing" + data);
         this.editWorkLoadForm.setValue(data);
     });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  addKeyword(){
        const control = <FormArray>this.editWorkLoadForm.controls['_keywordList'];
        control.push(this.initKeywordList());
  }

  removeKeyword(i: number) {
        const control = <FormArray>this.editWorkLoadForm.controls['_keywordList'];
        control.removeAt(i);
    }


  initKeywordList(){
        return this.formBuilder.group({
           word: [""]
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
      console.log("fired submit");
          this.userService.updateWorkload(this.editWorkLoadForm.value)
                    .subscribe(
                        data => {
                        this.router.navigate(['list-workload']);
                     }
                    );

  }

}
