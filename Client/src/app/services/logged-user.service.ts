import { Injectable } from '@angular/core';
import {User} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private loggedUser: User | null = null;

  constructor() {}

  set user(user: User | null) {
    this.loggedUser = user;
  }

  get user(): User | null {
    return this.loggedUser;
  }
}
