import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHelperService } from 'src/app/services/http-helper.service';
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

  constructor(private http:HttpHelperService, private router: Router) { 

  }

  ngOnInit(): void {
    let url = this.router.parseUrl(this.router.url);
    this.id = url.queryParams['id'];
    this.http.get<organizationInfo>(environment.backend + "/organizations/" + this.id)
      .subscribe((data => {
        this.organization = data;
      }));
  }

}
