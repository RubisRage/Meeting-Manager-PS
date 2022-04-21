import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'org-dropdown',
  templateUrl: './org-dropdown.component.html',
  styleUrls: ['./org-dropdown.component.css']
})
export class OrgDropdownComponent implements OnInit {

  Organizaciones=[
    "Padel", "Universidad", "Trabajo"
  ]
  constructor() { }

  ngOnInit(): void {
  }

}