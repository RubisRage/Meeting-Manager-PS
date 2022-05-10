import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserInfo} from "../../types/userInfo";
import {OrganizationService} from "../../services/organization.service";
import {Subscription, switchMap} from "rxjs";
import {OrganizationInfo} from "../../types/organizationInfo";
import {AuthHelperService} from "../../services/auth-helper.service";
import {DeleteConfirmComponent} from "../../dialog/delete-confirm/delete-confirm.component";
import {environment} from "../../../environments/environment";
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { MatDialog } from "@angular/material/dialog";
import { User } from 'src/app/types/user';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {

  username!: string;
  orgInfo!: OrganizationInfo;
  members!: UserInfo[];
  orgSubscription!: Subscription;
  memberSubscription!: Subscription;
  userSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private orgService: OrganizationService,
    private userService: UserService,
    private auth: AuthHelperService,
    private http:HttpHelperService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.userSubscription = this.userService.user$.subscribe( user => {
      this.username = user.username;

      if(this.routeSubscription) {
        this.routeSubscription.unsubscribe();
      }

      this.routeSubscription = this.activeRoute.paramMap.subscribe(paramMap => {
        if(this.orgSubscription) {
          this.orgSubscription.unsubscribe();
        }

        if(this.memberSubscription) {
          this.memberSubscription.unsubscribe();
        }

        const id = paramMap.get('id');

        if(id) {
          this.memberSubscription = this.orgService.getOrganizationMembers(id).subscribe(members => {
            this.members  = members;
          });

          this.orgSubscription = this.orgService.getOrganization(id, user.username).subscribe(org => {
            this.orgInfo = org;
          });
        }
      });
    })

  }

  ngOnDestroy() {
    if(this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }

    if(this.memberSubscription) {
      this.memberSubscription.unsubscribe();
    }

    if(this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onClick(): void{
    this.dialog.open(DeleteConfirmComponent,{
      data: '¿Deseas eliminar a este usuario?'
    })
      .afterClosed()
      .subscribe((confirm:boolean) =>{
        if (confirm){
          this.http.delete(environment.backend + "/organization/" + this.orgInfo.id + "/users/" + this.username)
            .subscribe()
        }
      })
  }

}
