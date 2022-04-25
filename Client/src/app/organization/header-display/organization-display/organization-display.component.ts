import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpHelperService } from 'src/app/services/http-helper.service';

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.css']
})
export class OrganizationDisplayComponent implements OnInit {

  username: string;
  organizations!: {id:number, name:string}[];
  show: boolean;

  constructor(private http: HttpHelperService) { 
    this.username = "";
    this.show = false;
  }

  ngOnInit(): void {
    this.http.get(environment.backend + "/users/" + this.username + "/organizations")
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
