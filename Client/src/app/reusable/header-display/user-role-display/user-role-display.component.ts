import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpHelperService } from 'src/app/services/http-helper.service';


@Component({
  selector: 'app-user-role-display',
  templateUrl: './user-role-display.component.html',
  styleUrls: ['./user-role-display.component.css']
})
export class UserRoleDisplayComponent implements OnInit {
  userRole!: string;
  show!: boolean;
  admin!: boolean;
  

  constructor(
    private dialog: MatDialog,
    private http: HttpHelperService
    ) { 

      this.admin=false;
  }

  ngOnInit(): void {
    this.isAdmin();
 
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

  isAdmin(){
    if(this.admin==true){
      this.show=true;
      this.userRole='Administrador';
    }else{
      this.show=false;
    }
  }


}
