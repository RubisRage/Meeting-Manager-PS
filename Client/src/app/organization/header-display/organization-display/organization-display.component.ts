import { Component, OnInit, Input } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { CreateOrganizationComponent } from 'src/app/create-organization/create-organization.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.css']
})
export class OrganizationDisplayComponent implements OnInit {
  @Input () organizationSelection = "Selecciona tu Organización";
  orgs: any;
  organizations!: {id:number, name:string}[];
  show: boolean;
  

  constructor(private http: HttpHelperService, 
    private dialog: MatDialog, private router: ActivatedRoute,
    private loggedUser: LoggedUserService) { 
    this.show = false;
  }

  ngOnInit(): void {
    this.http.get(environment.backend + "/users/" + this.loggedUser.user?.username + "/organizations")
      .subscribe(
        (data) => {
          this.organizations = data;
        }
      );
  }

  displayOrganization(){
    this.show = true;
  }

  closeOrganization(){
    this.show = false;
  }

  errorm(){
    console.log("error")
    return "error";
  }

  openCreateOrganizationDialog(){
    this.dialog.open(CreateOrganizationComponent, {
      height: '80vh',
      width: '80vw'
    })
  }

}
