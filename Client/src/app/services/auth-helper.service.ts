import {Injectable} from '@angular/core';
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

  public getOrganizations(url: string): Observable<{id:number, name:string}[]> {
    return this.http.get<{id:number, name:string}[]>(url);
  }

  public getNmaeUser(url: string): Observable<{username:string, fullname:string, imgURL:string}> {
    return this.http.get<{username:string, fullname:string, imgURL:string}>(url);
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
