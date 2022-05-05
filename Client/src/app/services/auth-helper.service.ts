import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenResponse} from "../types/token-response";
import {Observable, concat} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  private readonly USER_ID = "user"
  private readonly TOKEN_ID = "token"

  private _token: string | null = null;
  private _user!: User;

  constructor(private http: HttpClient) {

    this._token = localStorage.getItem(this.TOKEN_ID);

    const userJson = localStorage.getItem(this.USER_ID);
    if(userJson !== null) {
      this._user = JSON.parse(userJson);
    }

  }

  public login(loginInformation: {username: string, password: string}): Observable<void> {
    return new Observable<void>(subscriber => {
      this.http.post<TokenResponse>(environment.backend + "/users/login", loginInformation).subscribe({
        next: tokenResponse => {
          this._token = tokenResponse.token;
          localStorage.setItem(this.TOKEN_ID, this._token);

          this.http.get<User>(environment.backend + `/users/${loginInformation.username}`, {
            headers: new HttpHeaders({"Authorization": `Bearer ${this._token}`})
          }).subscribe((user) => {
            this._user = user;
            localStorage.setItem(this.USER_ID, JSON.stringify(this._user));
            subscriber.next();
          });
        },
        error: err => {
          subscriber.error(err);
        }
      });
    });
  }

  public logout(): boolean {
    if(!this.logged) return false;

    localStorage.clear();
    this._token = null;

    return true;
  }

  get token(): string | null {
    return this._token;
  }

  get logged(): boolean {
    return this.token !== null;
  }

  get user(): User {
    return this._user;
  }
}
