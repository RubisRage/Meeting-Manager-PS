import { Component, OnInit } from '@angular/core';
import {LoggedUserService} from "../services/logged-user.service";
import {User} from "../types/user";
import {environment} from "../../environments/environment"
import {HttpHelperService} from "../services/http-helper.service";
import {AuthHelperService} from "../services/auth-helper.service";
import {Router} from "@angular/router";


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


  constructor(public userService: LoggedUserService,
              private router: Router,
              private http: HttpHelperService,
              private AuthHelper:AuthHelperService) { }

  ChangeUsername(){
  this.http.put(environment.backend +"/users/" + this.userService.user!.username ,
    {username: this.user.username,
      fullname: this.userService.user!.realName,  //change
      imgURL: this.userService.user!.imgURL,
      token:this.AuthHelper.token


    } )

}
  ChangePassword(){
    this.http.put(environment.backend+"/users/"+this.userService.user!.username +"/password",{
      oldPassword:this.user.oldPassword,
      newPassword:this.user.newPassword
    })

  }
  Delete(){
    this.http.delete(environment.backend+"/users/" + this.userService.user!.username)
  }



  ngOnInit(): void {


  }

}
