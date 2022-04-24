import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
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
  id = 2;

  constructor(private auth:AuthHelperService) { }

  ngOnInit(): void {
    this.auth.getMembersOfOrganizationById(environment.backend + "/organizations/" + this.id + "/users")
      .subscribe((data => {
        this.members = data;
      }));
  }

}
