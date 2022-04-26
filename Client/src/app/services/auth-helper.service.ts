import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenResponse} from "../types/token-response";
import {Observable} from "rxjs";
import { userInfo } from '../types/userInfo';
import { organizationInfo } from '../types/organizationInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  private _token: string | null = null;

  constructor(private http: HttpClient) {}

  public login(url: string, loginInformation: {username: string, password: string}): Observable<void> {
    return new Observable<void>(subscriber => {
      this.http.post<TokenResponse>(url, loginInformation).subscribe({
        next: tokenResponse => {
          this._token = tokenResponse.token;
          subscriber.next();
        },
        error: err => {
          subscriber.error(err);
        }
      });
    });
  }

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
