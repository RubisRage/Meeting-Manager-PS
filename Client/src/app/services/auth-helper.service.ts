import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenResponse} from "../types/token-response";
import {Observable, concat} from "rxjs";
import {environment} from "../../environments/environment";
import {LoggedUserService} from "./logged-user.service";
import {User} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  private _token: string | null = null;

  constructor(private http: HttpClient,
              private loggedUser: LoggedUserService) {}

  public login(loginInformation: {username: string, password: string}): Observable<void> {
    return concat(new Observable<void>(subscriber => {
      this.http.post<TokenResponse>(environment.backend + "/users/login", loginInformation).subscribe({
        next: tokenResponse => {
          this._token = tokenResponse.token;
          this.http.get<User>(environment.backend + `/users/${loginInformation.username}`, {
            headers: new HttpHeaders({
              "Authorization": `Bearer ${this._token}`
            })
          }).subscribe(
            user => {
              this.loggedUser.user = user
              subscriber.next();
            }
          );
        },
        error: err => {
          subscriber.error(err);
        }
      });
    })
    );
  }

//   this.http.get<User>(environment.backend + `/users/${loginInformation.username}`, {
// headers: new HttpHeaders({
// "Authorization": `Bearer ${this._token}`
// })
// }).subscribe(
// user => {
// this.loggedUser.user = user
// }
// );
public logout(): boolean {
if(!this.logged) return false;

this._token = null;
return true;
  }


  get token(): string | null {
    return this._token;
  }

  get logged(): boolean {
    return this.token !== null;
  }
}
