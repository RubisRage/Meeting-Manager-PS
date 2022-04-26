import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { userInfo } from 'src/app/types/userInfo';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  /*
  members = ["Sonic", "Tails", "Knucles", 
      "Shadow", "Eggman", "Amy", "Luffy",
      "Jaime", "Antonio", "Romeo", "Julieta",
      "Ale", "Alejo", "Jose", "Fran", "Rubén",
      "NanoJJG"]
  */
  members:userInfo[] = [];
  id: number;

  constructor(private http:HttpHelperService, private router: Router) { 
    this.id = 0;
  }

  ngOnInit(): void {
    let url = this.router.parseUrl(this.router.url);
    this.id = url.queryParams['id'];
    this.http.get<userInfo[]>(environment.backend + "/organizations/" + this.id + "/users")
      .subscribe((data => {
        this.members = data;
      }));
  }

}
