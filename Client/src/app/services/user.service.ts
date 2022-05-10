import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {User} from "../types/user";
import {environment} from "../../environments/environment";
import {filter, firstValueFrom, interval, Observable, switchMap} from "rxjs";
import {AuthHelperService} from "./auth-helper.service";
import {HttpHelperService} from "./http-helper.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$!: Observable<User>;
  private user!: User;

  constructor(
    private auth: AuthHelperService,
    private http: HttpHelperService
  )
  {
    this.user$ = interval(1000).pipe(
      switchMap( async () => {
        return await firstValueFrom(this.http.get<User>(`${environment.backend}/users/${auth.username}`))
      }),
      filter( (user, index) => {
        return index === 0 || this.user.username !== user.username;
      })
    );

    this.user$.subscribe(user => {
      this.user = user;
    })
  }

  public updateUser(username?: string, fullname?: string) {
    const data: any = {};

    if(username !== undefined)
      data.username = username;
    else
      data.username = this.user.username;

    if(fullname !== undefined)
      data.fullname = fullname;
    else
      data.fullname = this.user.fullname;

    data.imgURL = this.user.imgURL;

    this.http.put<User>(`${environment.backend}/users/${this.user.username}`, data)
      .subscribe(async (res) => {
        localStorage.setItem(this.auth.USER_ID, res.username);
      });
  }
}
