import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { organizationInfo } from 'src/app/types/organizationInfo';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'org-description',
  templateUrl: './org-description.component.html',
  styleUrls: ['./org-description.component.css']
})
export class OrgDescriptionComponent implements OnInit {

  organization!:any;

  constructor(private http:HttpHelperService, 
    private router: ActivatedRoute, private userService: AuthHelperService) { 

  }

  ngOnInit(): void {
    //let url = this.router.parseUrl(this.router.url);
    //this.id = url.queryParams['id'];
    this.router.params.subscribe(params => {
      this.http.get(environment.backend + "/organizations/" + params['id'] + "/users/" + this.userService.user.username)
        .subscribe((data => {
          this.organization = {
            id: data.id,
            name: data.name,
            description: data.description,
            imgURL: data.imgURL
          };
        }));
    });
    
  }

}
