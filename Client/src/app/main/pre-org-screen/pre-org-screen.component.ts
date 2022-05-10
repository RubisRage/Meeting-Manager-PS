import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/types/organization';
import { HttpHelperService } from '../../services/http-helper.service';

@Component({
  selector: 'app-pre-org-screen',
  templateUrl: './pre-org-screen.component.html',
  styleUrls: ['./pre-org-screen.component.css']
})
export class PreOrgScreenComponent implements OnInit {


  organizations!: Organization[];
  subscription!: Subscription;
  guardar!: Organization[];

  constructor(private http: HttpHelperService,
    private authService:AuthHelperService, private orgService: OrganizationService) { }

  ngOnInit(): void {
    this.subscription = this.orgService.getAllOrganizations(this.authService.user.username)
        .subscribe(orgs => {
          if(this.equalsOrganization(this.organizations, this.guardar)){
            this.organizations = orgs;
            this.guardar=this.organizations; 
          }
        });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
