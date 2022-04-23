import { Component, OnInit } from '@angular/core';
import {CreateOrganizationDialogComponent} from "../../create-organization-dialog/create-organization-dialog.component";
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
    this.dialog.open(CreateOrganizationDialogComponent, {
      height: '80vh',
      width: '80vw'
    });
  }
}
