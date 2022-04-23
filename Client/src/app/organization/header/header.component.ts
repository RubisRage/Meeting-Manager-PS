import { Component, OnInit } from '@angular/core';
import {CreateOrganizationComponent} from "../../create-organization/create-organization.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'org-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateOrganizationDialog() {
    this.dialog.open(CreateOrganizationComponent, {
      height: '80vh',
      width: '80vw'
    });
  }
}
