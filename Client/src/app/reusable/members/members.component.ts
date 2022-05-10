import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserInfo} from "../../types/userInfo";
import {OrganizationService} from "../../services/organization.service";
import {Subscription} from "rxjs";
import {OrganizationInfo} from "../../types/organizationInfo";
import {AuthHelperService} from "../../services/auth-helper.service";
import {DeleteConfirmComponent} from "../../dialog/delete-confirm/delete-confirm.component";
import {environment} from "../../../environments/environment";
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { MatDialog } from "@angular/material/dialog";

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
    private auth: AuthHelperService,
    private http:HttpHelperService,
    public dialog: MatDialog
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

  onClick(): void{
    this.dialog.open(DeleteConfirmComponent,{
      data: '¿Deseas eliminar a este usuario?'
    })
      .afterClosed()
      .subscribe((confirm:boolean) =>{
        if (confirm){
          this.http.delete(environment.backend+"/organization/"+this.orgInfo.id+"/users/" +
                            this.auth.user!.username)
            .subscribe()
        }
      })
  }

}
