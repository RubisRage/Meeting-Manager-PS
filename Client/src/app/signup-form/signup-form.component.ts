import { Component, Injectable } from '@angular/core';
import { User } from '../interface/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['../styles.css']
})

export class SignUpComponent{
 
  //Direccion a la que se redirigirá 
  APIRoute = "localhost:8080/api/users/";

  register: User = {
    username:"",
    realName:"",
    password:""
  }


  constructor( private router: Router,
               private http: HttpClient ) {}

  goToPage(route: string): void {
    this.router.navigate([route]);
  }

  submit(){
    return this.http.post(this.APIRoute, this.register);
  }
}
