import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenResponse} from "../types/token-response";
import {Observable, concat, firstValueFrom, map} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  readonly USER_ID = "user"
  private readonly TOKEN_ID = "token"

  private _token: string | null = null;
  private _username!: string;

  constructor(private http: HttpClient) {

    this._token = localStorage.getItem(this.TOKEN_ID);

    const username = localStorage.getItem(this.USER_ID);

    if(username) {
      this._username = username;
    }
  }

  public login(loginInformation: {username: string, password: string}): Observable<void> {
    return new Observable<void>(subscriber => {
      this.http.post<TokenResponse>(environment.backend + "/users/login", loginInformation).subscribe({
        next: tokenResponse => {
          this._token = tokenResponse.token;
          this._username = loginInformation.username;
          localStorage.setItem(this.TOKEN_ID, this._token);
          localStorage.setItem(this.USER_ID, this._username);
          subscriber.next();
        },
        error: err => {
          subscriber.error(err);
        }
      });
    })
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

  get username(): string {
    return this._username;
  }

  set username(username) {
    localStorage.setItem(this.USER_ID, this._username);
    this._username = username;
  }
}
