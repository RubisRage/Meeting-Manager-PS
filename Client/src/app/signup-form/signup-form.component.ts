import { Component, Injectable } from '@angular/core';
import { User } from '../interface/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class TemplateFormComponent{

  APIRoute = "localhost:8080/users/";

  register: User = {
    username:"",
    fullname:"",
    password:""
  }


  constructor( private http: HttpClient) {}

  submit(){
    console.log('username = ' + this.register.username);
    console.log('Fullname = ' + this.register.fullname);
    console.log('Password = ' + this.register.password);
    console.log(this.register);
    return this.http.post(this.APIRoute + "", this.register);

  }
}
