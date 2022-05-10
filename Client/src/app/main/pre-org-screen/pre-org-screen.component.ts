import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { organization } from 'src/app/types/organization';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../../services/http-helper.service';

@Component({
  selector: 'app-pre-org-screen',
  templateUrl: './pre-org-screen.component.html',
  styleUrls: ['./pre-org-screen.component.css']
})
export class PreOrgScreenComponent implements OnInit {

  organizations!: organization[];
  guardarorg!: organization[];

  constructor(private http: HttpHelperService,
    private authService:AuthHelperService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    /*
    this.organizations = [
      {id:1, name:"Padel"},
      {id:2, name:"Boxeo"},
      {id:3, name:"Produccion de Software"},
      {id:4, name:"Clase"},
    ];
    */

    /* this.http.get(environment.backend + "/users/" + this.authService.user?.username + "/organizations")
      .subscribe(
        (data) => {
            this.organizations = data;
            this.guardarorg = this.organizations;
        }); */
      
    setInterval( () => {
    this.http.get(environment.backend + "/users/" + this.authService.user?.username + "/organizations")
      .subscribe(
        (data) => {
          if(this.equalsOrganization(this.guardarorg, data)){
            this.organizations = data;
            this.guardarorg = this.organizations;
            
          }
        }
      );},1000);
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
