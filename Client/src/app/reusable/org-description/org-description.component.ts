import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationInfo } from 'src/app/types/organizationInfo';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'org-description',
  templateUrl: './org-description.component.html',
  styleUrls: ['./org-description.component.css']
})
export class OrgDescriptionComponent implements OnInit, OnDestroy {

  organization!: OrganizationInfo;
  currentUid!: string;
  subscription!: Subscription;

  constructor(private http:HttpHelperService, 
    private router: ActivatedRoute,
    private auth: AuthHelperService,
    private orgService: OrganizationService) { 
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }

      const id = params.get('id');
      console.log(id);

      if(id) {
        this.currentUid = id;
        this.subscription = this.orgService.getOrganization(this.currentUid, this.auth.user.username)
          .subscribe(org => {
            this.organization = org;
          });
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

 /*  equalsOrganization(e1: {id:number, name:string}[], p2: any): Boolean{
    if(e1===undefined)return true;
    if (e1.length === p2.length){
      let i = 0;
      for(let p of p2){
        if(e1[i].id !== p.id || e1[i].name !== p.name) {return true;}
        i++;
      }
      return false;
    } */
}
