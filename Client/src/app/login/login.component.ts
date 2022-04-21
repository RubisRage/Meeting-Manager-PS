import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AuthHelperService} from "../services/auth-helper.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles.css']
})
export class LoginComponent implements OnInit {

  loginInformation = {
    username: "",
    password: ""
  }

  constructor(public router: Router,
              private auth: AuthHelperService) { }

  ngOnInit(): void {
    if(this.auth.logged) {
      this.router.navigate(["/organizations"]);
    }
  }

  submit(): void {
    this.auth.login( environment.backend,
      this.loginInformation)
      .subscribe({
        next: () => {
          this.router.navigate(["/organization"]);
        },
        error: err => {
          console.log("error");
        }
      });
  }
}























