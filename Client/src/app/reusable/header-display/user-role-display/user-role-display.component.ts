import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateOrganizationComponent } from 'src/app/dialog/create-organization/create-organization.component';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { LoggedUserService } from 'src/app/services/logged-user.service';

@Component({
  selector: 'app-user-role-display',
  templateUrl: './user-role-display.component.html',
  styleUrls: ['./user-role-display.component.css']
})
export class UserRoleDisplayComponent implements OnInit {
  @Input () userRole = "Supongamos que pone el ROL del usuario";
  orgs: any;
  organizations!: {id:number, name:string}[];
  show: boolean;
  

  constructor(private dialog: MatDialog) { 
    this.show = false;
  }

  ngOnInit(): void {
 
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


}
