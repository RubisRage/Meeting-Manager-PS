import { Injectable } from '@angular/core';
import {AuthHelperService} from "./auth-helper.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private auth: AuthHelperService,
              private http: HttpClient) { }

  get<T = any>(url: string) {
    return this.http.get<T>(url, {
      headers: this.getAuthEntry()
    });
  }

  post<T = any>(url: string, body: any) {
    return this.http.post<T>(url, body, {
      headers: this.getAuthEntry()
    });
  }

  put<T = any>(url: string, body: any) {
    return this.http.put<T>(url, body, {
      headers: this.getAuthEntry()
    });
  }

  delete<T = any>(url: string) {
    return this.http.delete<T>(url, {
      headers: this.getAuthEntry()
    })
  }

  private getAuthEntry(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.token}`
    });
  }
}
