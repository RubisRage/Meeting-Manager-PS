import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from "../../../services/auth-helper.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {

  userToken = "MasterJoseph";
  username: string;
  userlogin!: {username:string, fullname:string, imgURL:string};
  fullname: string;
  imgURL: string;

  constructor(private auth: AuthHelperService) { 
    this.username = "";
    this.fullname = "";
    this.imgURL = "";
  }

  ngOnInit(): void {
    this.auth.getNmaeUser(environment.backend + "/users/" + this.userToken)
    .subscribe(
      (data) => {
        this.userlogin = data;
        this.username = this.userlogin.username;
        this.imgURL = this.userlogin.imgURL;
      }
    );
  }

}
