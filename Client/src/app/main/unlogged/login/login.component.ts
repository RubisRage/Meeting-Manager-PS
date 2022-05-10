import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AuthHelperService} from "../../../services/auth-helper.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles.css']
})
export class LoginComponent implements OnInit {

  show_error=false;
  error_message:any="";

  loginInformation = {
    username: "",
    password: ""
  }

  constructor(public router: Router,
              private auth: AuthHelperService) { }

  ngOnInit(): void {
    if(this.auth.logged) {
      this.router.navigate(["/main/pre-org"]);
    }
  }

  submit(): void {
    this.auth.login(this.loginInformation)
      .subscribe({
        next: () => {
          this.router.navigate(["/main/pre-org"]);
        },
        error: err => {
          this.show_error = true;
          this.error_message = err.error.message.split(',')[1].trim()/*.toUpperCase()*/;
        }
      });
  }
}























