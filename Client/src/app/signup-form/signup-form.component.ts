import { Component, Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent{

  APIRoute = "localhost:8080/api/users/";

  register: User = {
    username:"",
    realName:"",
    password:""
  }


  constructor( private http: HttpClient) {}

  submit(){
    return this.http.post(this.APIRoute, this.register);
  }
}
