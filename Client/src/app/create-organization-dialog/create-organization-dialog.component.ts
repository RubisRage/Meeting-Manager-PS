import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpHelperService} from "../services/http-helper.service";

@Component({
  selector: 'app-create-organization-dialog',
  templateUrl: './create-organization-dialog.component.html',
  styleUrls: ['./create-organization-dialog.component.css']
})
export class CreateOrganizationDialogComponent {

  imgURL = "assets/pictures/org_default_picture.svg"

  constructor(public dialogRef: MatDialogRef<CreateOrganizationDialogComponent>,
              private http: HttpHelperService) { }



}
