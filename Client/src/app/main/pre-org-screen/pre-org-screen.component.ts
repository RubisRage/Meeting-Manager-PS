import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {map, Subscription, switchMap} from 'rxjs';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/types/organization';
import { HttpHelperService } from '../../services/http-helper.service';
import {UserService} from "../../services/user.service";
import {User} from "../../types/user";

@Component({
  selector: 'app-pre-org-screen',
  templateUrl: './pre-org-screen.component.html',
  styleUrls: ['./pre-org-screen.component.css']
})
export class PreOrgScreenComponent implements OnInit {
  user!: User;
  organizations!: Organization[];
  private orgsSubscription!: Subscription;

  constructor(
    private http: HttpHelperService,
    private userService: UserService,
    private orgService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.orgsSubscription = this.userService.user$.pipe(
      switchMap( user => {
        return this.orgService.getAllOrganizations(user.username);
      })
    ).subscribe(orgs => {
      if(this.equalsOrganization(this.organizations, orgs)){
        this.organizations = orgs;
      }
    })
  }

  ngOnDestroy () {
    this.orgsSubscription.unsubscribe();
  }


  equalsOrganization(e1: {id:number, name:string}[], p2: any): Boolean{
    if(e1===undefined)return true;
    if (e1.length === p2.length){
      let i = 0;
      for(let p of p2){
        if(e1[i].id !== p.id || e1[i].name !== p.name) {return true;}
        i++;
      }
      return false;
    }
    return true;
  }
}
