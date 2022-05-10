import { Injectable } from '@angular/core';
import { firstValueFrom, interval, Observable, Subscriber, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrganizationInfo } from '../types/organizationInfo';
import { Organization } from '../types/organization';
import { HttpHelperService } from './http-helper.service';
import {UserInfo} from "../types/userInfo";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpHelperService) { }

  getOrganization(uid: string, username: string): Observable<OrganizationInfo> {
    return interval(1000).pipe(
      switchMap(async () => {
        return await firstValueFrom(this.http.get<OrganizationInfo>(`${environment.backend}/organizations/${uid}/users/${username}`));
      })
    )
  }

  getAllOrganizations(username: string): Observable<Organization[]> {
    return interval(1000).pipe(
      switchMap(async () => {
        return await firstValueFrom(
          this.http.get<Organization[]>(`${environment.backend}/users/${username}/organizations`)
        );
      })
    );
  }

  getOrganizationMembers(uid: string): Observable<any> {
    return interval(1000).pipe(
      switchMap(async () => {
        return await firstValueFrom(
          this.http.get<UserInfo>(`${environment.backend}/organizations/${uid}/users`)
        );
      })
    );
  }
}
