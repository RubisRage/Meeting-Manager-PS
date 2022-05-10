import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { CreateOrganizationComponent } from 'src/app/dialog/create-organization/create-organization.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../../services/user.service";
import {OrganizationService} from "../../../services/organization.service";
import {Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.css'],
})
export class OrganizationDisplayComponent implements OnInit {
  @Input() organizationSelection = 'Selecciona tu Organización';
  orgs: any;
  organizations!: { id: number; name: string }[];
  show: boolean;
  @Input () id! : number;
  organization!:any;
  guardarorg!: {id:number, name:string}[];

  private subscription!: Subscription;

  constructor(
    private http: HttpHelperService,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private userService: UserService,
    private orgService: OrganizationService
  )
  {
    this.organizationSelection = this.chooseOrganization();
    this.show = false;
  }

  ngOnInit(): void {

    this.subscription = this.userService.user$.pipe(
      switchMap(user => {
          return this.orgService.getAllOrganizations(user.username);
      })
    ).subscribe(
      (data) => {
        if (this.equalsOrganization(this.guardarorg, data)) {
          this.organizations = data;
          this.guardarorg = this.organizations;
        }
      })
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


  chooseOrganization(): string {
    if (this.id==null){
      return "Seleciona tu Organización"
    }else{
      this.router.params.subscribe(params => {
        this.http.get(environment.backend + "/organizations/" + params['id'])
          .subscribe((data => {
            this.organization = {
              id: data.id,
              name: data.name,
              description: data.description,
              imgURL: data.imgURL
            };
          }));
      });
      return this.organization.name;
    }
  }

  displayOrganization() {
    this.show = true;
  }

  closeOrganization() {
    this.show = false;
  }

  errorm() {
    console.log('error');
    return 'error';
  }

  openCreateOrganizationDialog() {
    this.dialog.open(CreateOrganizationComponent, {
      height: '80vh',
      width: '80vw',
    });
  }
}
