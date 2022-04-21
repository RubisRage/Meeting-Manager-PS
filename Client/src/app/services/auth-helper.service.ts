import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenResponse} from "../types/token-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  private _token: string | null = null;

  constructor(private http: HttpClient) {}

  public login(url: string, loginInformation: {username: string, password: string}): Observable<void> {
    let result = new Observable<void>(subscriber => {
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

    return result;
  }


  get token(): string | null {
    return this._token;
  }

  get logged(): boolean {
    return this.token !== null;
  }
}