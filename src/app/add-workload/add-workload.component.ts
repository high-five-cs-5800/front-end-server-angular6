import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";

import { AuthenticationService } from "../service/auth.service";
import { UserService } from "../service/user.service";


import { first} from "rxjs/operators";
import { Router} from "@angular/router";
import { Workloads } from "../model/workload.model";

//import { Keyword } from "../model/keyword.model";
//import { Contact } from "../model/contact.model";

@Component({
  selector: 'app-add-workload',
  templateUrl: './add-workload.component.html',
  styleUrls: ['./add-workload.component.css']
})

export class AddWorkloadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  lists = [
    {value: 0, label: 'type 0'},
    {value: 1, label: 'type 1'},
    {value: 2, label: 'type 2'}
  ];
 commonWordSet = new Set();
 common = [ "the", "be", "to", "of",  "and", "a", "in", "that", "have", "I", "i", "it", "for", "not",//];
            "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they",
            "we", "say", "her", "she", "or", "will", "my", "one", "all", "would", "there", "their",
            "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
            "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year",
            "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look",
            "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work",
            "first", "well", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
            "time", "person", "year", "way", "day", "thing", "man", "would", "life", "hand", "part", "child",
            "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", "group",
            "problem", "fact", "little", "long", "great", "big", "own", ""];
    //var i;
    //for(i = 0; i < 3; i++){
    //	console.log(i);
    //}
  dictSet = new Set();

  //workload: Workloads;
 
  addWorkLoadForm: FormGroup;

  ngOnInit() {
    this.addWorkLoadForm = new FormGroup(
      {
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
      }
    )
    for(let i = 0; i < this.common.length; i++){
        this.commonWordSet.add(this.common[i]);
    }

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  addKeyword(){
        const control = <FormArray>this.addWorkLoadForm.controls['_keywordList'];
        control.push(this.initKeywordList());
  }

  removeKeyword(i: number) {
        const control = <FormArray>this.addWorkLoadForm.controls['_keywordList'];
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
      //parasing code 
     
      const control2 = <FormArray>this.addWorkLoadForm.controls['_keywordList'];
      control2.removeAt(0);
      var subjectStr  = this.addWorkLoadForm.get('subject').value;
      this.parsingStrings(subjectStr);
      var requestStr = this.addWorkLoadForm.get('case_request_detail').value;
      this.parsingStrings(requestStr);	 

      var product = this.addWorkLoadForm.get('product_line').value;
      var item = this.formBuilder.group({ word: [product] });
      //var item2 = this.formBuilder.group({ word: "test" });
	
      var newArr = Array.from(this.dictSet);
      console.log(newArr);
      for(let item of newArr)
      {
          if(!this.commonWordSet.has(item))
          {
              console.log(item);
              var temp = this.formBuilder.group({ word: [item] });
              control2.push(temp);
          } 
      }
      //console.log(this.dictSet);
      //console.log(this.dictSet.values());
      //console.log(this.dictSet.keys());
      //this.dictSet.forEach( v => {
      //   console.log(v.value);
	// console.log(v.key);
        // var temp = this.formBuilder.group({ word: [v.value] });
        // control2.push(temp);})
      control2.push(item);
      //control2.push(item2);

      this.userService.createWorkload(this.addWorkLoadForm.value)
          .subscribe( data => {
              let user_type = sessionStorage.getItem('user_type');
              if(user_type  == "2" ) {
                   this.router.navigate(['list-workload']);
              }else{
		   this.router.navigate(['client-user']);
              }
           });
  }
 
 parsingStrings(SubsString: String): void{
 	var SubSetOne = SubsString.toLowerCase();
  	var SubSetTwo = SubSetOne.split(/[\s\d,".]+/);

 	for(let i = 0; i < SubSetTwo.length; i++)
 	{
  		if(!this.commonWordSet.has(SubSetTwo[i]))
  		{
   			this.dictSet.add(SubSetTwo[i]);
		}
	}
  }
  
}

