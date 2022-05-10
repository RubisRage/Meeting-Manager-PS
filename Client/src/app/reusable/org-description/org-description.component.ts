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

  organization!:organizationInfo;

  constructor(private http:HttpHelperService, 
    private router: Router,
    private auth: AuthHelperService) { 
  }

  ngOnInit(): void {
    setInterval( () => {
      const url = this.router.url;
        let segments: string[] = url.split("/");
        let id = segments[3];
        console.log(id);
      this.http.get(environment.backend + "/organizations/" + id + "/users/" + this.auth.user.username)
          .subscribe(data => {
          this.organization=data;            
          }
          );
    },1000);
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
