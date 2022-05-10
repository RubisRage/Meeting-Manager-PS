import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserInfo} from "../../types/userInfo";
import {OrganizationService} from "../../services/organization.service";
import {Subscription} from "rxjs";
import {OrganizationInfo} from "../../types/organizationInfo";
import {AuthHelperService} from "../../services/auth-helper.service";

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {

  orgInfo!: OrganizationInfo;
  members!: UserInfo[];
  orgSubscription!: Subscription;
  memberSubscription!: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private orgService: OrganizationService,
    private auth: AuthHelperService
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramMap => {
      if(this.orgSubscription) {
        this.orgSubscription.unsubscribe();
      }

      if(this.memberSubscription) {
        this.memberSubscription.unsubscribe();
      }

      const id = paramMap.get('id');

      if(id) {
        this.orgSubscription = this.orgService.getOrganizationMembers(id).subscribe(members => {
          this.members  = members;
        });

        this.orgSubscription = this.orgService.getOrganization(id, this.auth.user.username).subscribe(org => {
          this.orgInfo = org;
        });
      }
    });
  }

  ngOnDestroy() {
    if(this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }

    if(this.memberSubscription) {
      this.memberSubscription.unsubscribe();
    }
  }

  onClick(){

  }

}
