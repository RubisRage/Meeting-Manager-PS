import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { organizationInfo } from 'src/app/types/organizationInfo';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'org-description',
  templateUrl: './org-description.component.html',
  styleUrls: ['./org-description.component.css']
})
export class OrgDescriptionComponent implements OnInit {

  id = 2;
  organization!:organizationInfo;

  constructor(private auth:AuthHelperService) { }

  ngOnInit(): void {
    this.auth.getOrganizationInfoById(environment.backend + "/organizations/" + this.id)
      .subscribe((data => {
        this.organization = data;
      }));
  }

}
