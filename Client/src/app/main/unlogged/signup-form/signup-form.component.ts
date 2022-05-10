import { Component, Injectable } from '@angular/core';
import { User } from '../../../types/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['../styles.css']
})
export class SignUpComponent{
  show_error=false;
  error_message:any="";

  register = {
    username:"",
    fullname:"",
    password:""
  }


  constructor( private router: Router,
               private http: HttpClient ) {}

  goToPage(route: string): void {
    this.router.navigate([route]);
  }

  submit(){
    this.http.post(environment.backend + "/users/register",
    {
      username: this.register.username,
      fullname: this.register.fullname,
      imgURL: "assets/pictures/profile.jpeg",
      password: this.register.password
    }).subscribe(
      () => {
      this.router.navigate(["/login"]);
      },
      (error) => {
        this.show_error = true;
        this.error_message = error.error.message.split(',')[1].trim()/*.toUpperCase()*/;
      }
    );
  }
}
