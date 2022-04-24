import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from "../../../services/auth-helper.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.css']
})
export class OrganizationDisplayComponent implements OnInit {

  username: string;
  organizations!: {id:number, name:string}[];
  show: boolean;

  constructor(private auth: AuthHelperService) { 
    this.username = "";
    this.show = false;
  }

  ngOnInit(): void {
    this.auth.getOrganizations(environment.backend + "/users/" + this.username + "/organizations")
      .subscribe(
        (data) => {
          this.organizations = data;
          console.log(data);
        }
      );
  }

  displayOrganization(){
    this.show = true;
    console.log(this.show);
  }

  closeOrganization(){
    this.show = false;
    console.log(this.show);
  }

  errorm(){
    console.log("error")
    return "error";
  }

}
