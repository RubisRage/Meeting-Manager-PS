import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment"
import {HttpHelperService} from "../../services/http-helper.service";
import {AuthHelperService} from "../../services/auth-helper.service";
import {User} from "../../types/user";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})


export class EditProfileComponent implements OnInit{



  user={
    username:"",
    fullname:"",
    oldPassword:"",
    newPassword:"",
  }


  constructor(public authService: AuthHelperService,
              private http: HttpHelperService,
              private auth: AuthHelperService) { }

  ChangeUsername(){
    this.auth.updateUser(this.user.username);
  }

  ChangePassword(){
    this.http.put(environment.backend+"/users/"+this.auth.user!.username +"/password",{
      oldPassword:this.user.oldPassword,
      newPassword:this.user.newPassword
    }).subscribe();
  }


  Delete(){
    this.http.delete(environment.backend+"/users/" + this.auth.user!.username)
  }



  ngOnInit(): void {


  }

}
