import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http"
import {Observable} from "rxjs";
import * as CryptoJS from "crypto-js";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: "",
    password: ""
  }

  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  submit(): void {
    let preparedUser = {
      username: this.user.username,
      password: CryptoJS.SHA256(this.user.password).toString()
    }

    this.http.get('http://localhost:8080', {responseType: 'text'})
      .subscribe(response => {
        console.log(response)
      });

    console.log(preparedUser.password);
  }

  goToPage(route: string): void {
    this.router.navigate([route]);
  }

}
























