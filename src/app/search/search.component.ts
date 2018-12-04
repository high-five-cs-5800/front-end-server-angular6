import { Component, OnInit } from '@angular/core';

import { AuthenticationService   } from "../service/auth.service";
import { UserService } from "../service/user.service";

import { Router } from "@angular/router";
import { Workloads } from "../model/workload.model";
import { Keyword } from "../model/keyword.model";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  username = "";
  keywordPool: Keyword[];
  workloadSingle: Workloads;
  workloadPool: Workloads[];
  workloadsUsers = new Array<Workloads>();
  userId: string;
  subForm: FormGroup;

 commonWordSet = new Set();
 common = [ "the", "be", "to", "of",  "and", "a", "in", "that", "have", "is", "i", "it", "for", "not",
            "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they",
            "we", "say", "her", "she", "or", "will", "my", "one", "all", "would", "there", "their",
            "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
            "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year",
            "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look",
            "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work",
            "first", "well", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
            "time", "person", "year", "way", "day", "thing", "man", "would", "life", "hand", "part", "child",
            "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", 
            "problem", "fact", "little", "long", "great", "big", "own", "", "please", "help", "while", "ago",
            "needs", "need", "thank", "unit", "messaged", ""];

  dictSet = new Set();

  workloadSet = new Set();

  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService, private router: Router, private userService: UserService) { }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
    this.username = sessionStorage.getItem('username');
  };

  ngOnInit() {
    let currentUser = sessionStorage.getItem('currentUser');
    JSON.parse(currentUser, (key,value)=>{
        if(key === 'userId')
           this.userId = value;
    });
    this.subForm = this.formBuilder.group({
      search_keyword: ['', Validators.required]
    });


  }

  onSubmit(){
	var word = this.subForm.value;
	this.parsingStrings(word.search_keyword);
	var newArr = Array.from(this.dictSet);
        for(let item of newArr)
        {
      		if(!this.commonWordSet.has(item))
      		{
                        console.log(item);
	   		this.userService.getKeywordsWithWord(item).subscribe( 
                               data => {
				for(let i = 0; i < data.length; i++){
			          this.userService.getWorkloadById(data[i].workloadId).subscribe(
                                          workload => { 
						if(this.workloadSet.has(data[i].workloadId)===false){
							this.workloadsUsers.push(workload);
                                                }
						this.workloadSet.add(data[i].workloadId);
					  })
	                        }
                        });
                 }
        }
  }

  onManageWorkload(){
    this.router.navigate(['manage-regular-user-workload']);
  }

  onDashBoard(){
    this.router.navigate(['regular-user']);

  }

  onSearch(){
    this.router.navigate(['search']);
  }

  parsingStrings(SubsString: String): void{
        var SubSetOne = SubsString.toLowerCase();
        var SubSetTwo = SubSetOne.split(/[\s,".]+/);

        for(let i = 0; i < SubSetTwo.length; i++)
        {
                if(!this.commonWordSet.has(SubSetTwo[i]))
                {
                        this.dictSet.add(SubSetTwo[i]);
			this.commonWordSet.add(SubSetTwo[i]);
                }
        }
  }

  onView(workload: Workloads): void {
    sessionStorage.removeItem("editWorkloadId");
    sessionStorage.setItem("editWorkloadId", workload.id.toString());
    this.router.navigate(['edit-regular-user-workload']);
   }



}

