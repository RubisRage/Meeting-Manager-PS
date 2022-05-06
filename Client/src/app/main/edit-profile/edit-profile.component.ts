import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment"
import {HttpHelperService} from "../../services/http-helper.service";
import {AuthHelperService} from "../../services/auth-helper.service";


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
              private AuthHelper:AuthHelperService) { }

  ChangeUsername(){
    // this.http.put(environment.backend +"/users/" + this.userService.user!.username , {
    //   username: this.user.username,
    //   fullname: this.userService.user!.fullname,  //change
    //   imgURL: this.userService.user!.imgURL,
    //   token:this.AuthHelper.token
    // }).subscribe(() => {
    //   this.http.get<User>(environment.backend + `/users/${this.userService}`)
    //     .subscribe(user => {
    //       this.userService.user = user;
    //     })
    // });

}
  ChangePassword(){
    this.http.put(environment.backend+"/users/"+this.AuthHelper.user!.username +"/password",{
      oldPassword:this.user.oldPassword,
      newPassword:this.user.newPassword
    }).subscribe();
  }


  Delete(){
    this.http.delete(environment.backend+"/users/" + this.AuthHelper.user!.username)
  }



  ngOnInit(): void {


  }

}
