import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment"
import {HttpHelperService} from "../../services/http-helper.service";
import {AuthHelperService} from "../../services/auth-helper.service";
import { User } from 'src/app/types/user';


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
              private http: HttpHelperService) { }

  ChangeUsername(){
    this.http.put(environment.backend +"/users/" + this.authService.user!.username , {
      username: this.user.username,
      fullname: this.authService.user!.fullname,  //change
      imgURL: this.authService.user!.imgURL,
      token:this.authService.token
    }).subscribe(() => {
      this.http.get<User>(environment.backend + `/users/${this.authService}`)
        .subscribe(user => {
          this.authService.user.username = user.username;
        })
    });
  }

  ChangePassword(){
    this.http.put(environment.backend+"/users/"+this.authService.user!.username +"/password",{
      oldPassword:this.user.oldPassword,
      newPassword:this.user.newPassword
    }).subscribe();
  }


  Delete(){
    this.http.delete(environment.backend+"/users/" + this.authService.user!.username)
  }



  ngOnInit(): void {


  }

}
