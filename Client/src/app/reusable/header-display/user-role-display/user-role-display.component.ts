import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationInfo } from 'src/app/types/organizationInfo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-role-display',
  templateUrl: './user-role-display.component.html',
  styleUrls: ['./user-role-display.component.css']
})
export class UserRoleDisplayComponent implements OnInit {
  @Input () id!:string;
  orgs: any;
  organizations!: {id:number, name:string}[];
  show: boolean = false;


  constructor(private dialog: MatDialog,
    private org:OrganizationService,
    private auth:AuthHelperService,
    private http: HttpHelperService) {
    this.org.getOrganization(this.id, this.auth.user.username).subscribe(
      (data:OrganizationInfo) => {
        this.show = data.isAdmin;
      }
    );
    
  }

  ngOnInit(): void {

  }

  displayOrganization(){
    this.show = true;
  }

  closeOrganization(){
    this.show = false;
  }

  addUser(){
  /*   this.dialog.open(AddUserCompontent,{
      data: '¿Deseas agregar a este usuario?'
    })
      .afterClosed()
      .subscribe((confirm:boolean) =>{
        if (confirm){
          this.http.post(environment.backend + "/organizations/" + 
            this.org.getOrganization(this.id, this.auth.user!.username) + "/users/" +
            this.auth.user!.username, {})
            .subscribe()
        }
      }); */
  }

  errorm(){
    console.log("error")
    return "error";
  }


}
