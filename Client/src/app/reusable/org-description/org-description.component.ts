import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private auth: AuthHelperService) { 

  }

  ngOnInit(): void {
    const url = this.router.url;
      let segments: string[] = url.split("/");
      let id = segments[3];
    console.log(id);
    
    this.http.get(environment.backend + "/organizations/" + id + "/users/" + this.auth.user.username)
        .subscribe((data => {
          console.log(data);
          this.organization = {
            id: data.id,
            name: data.name,
            description: data.description,
            imgURL: data.imgURL
          };
        }));    
  }

}
