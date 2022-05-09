import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateOrganizationComponent } from 'src/app/dialog/create-organization/create-organization.component';
import { HttpHelperService } from 'src/app/services/http-helper.service';

@Component({
  selector: 'app-commission-display',
  templateUrl: './commission-display.component.html',
  styleUrls: ['./commission-display.component.css']
})
export class CommissionDisplayComponent implements OnInit {
  @Input () commissionSelection = "Selecciona tu Comisión";
  orgs: any;
  organizations!: {id:number, name:string}[];
  show: boolean;
  

  constructor(private http: HttpHelperService, 
    private dialog: MatDialog, private router: ActivatedRoute,) { 
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

  openCreateOrganizationDialog(){
    this.dialog.open(CreateOrganizationComponent, {
      height: '80vh',
      width: '80vw'
    })
  }

}
