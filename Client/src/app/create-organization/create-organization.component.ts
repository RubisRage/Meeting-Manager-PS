import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpHelperService} from "../services/http-helper.service";

@Component({
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent {

  imgURL = "assets/pictures/org_default_picture.svg"

  constructor(public dialogRef: MatDialogRef<CreateOrganizationComponent>,
              private http: HttpHelperService) { }



}
