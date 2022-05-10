import { Injectable } from '@angular/core';
import { firstValueFrom, interval, Observable, Subscriber, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrganizationInfo } from '../types/organizationInfo';
import { Organization } from '../types/organization';
import { HttpHelperService } from './http-helper.service';

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
          this.http.get(`${environment.backend}/users/${username}/organizations`)
        );
      })
    );
  }
}
