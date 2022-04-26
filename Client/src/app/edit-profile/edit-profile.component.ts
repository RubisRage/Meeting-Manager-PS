import { Component, OnInit } from '@angular/core';
import {LoggedUserService} from "../services/logged-user.service";
import {User} from "../types/user";

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

  constructor(public userService: LoggedUserService) { }

  ngOnInit(): void {


  }

}
