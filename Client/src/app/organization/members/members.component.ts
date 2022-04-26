import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  id!: string;

  constructor(private http:HttpHelperService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.http.get(environment.backend + "/organizations/" + this.id + "/users")
        .subscribe(data => {
          this.members = data;
        });
    });
  }

}
