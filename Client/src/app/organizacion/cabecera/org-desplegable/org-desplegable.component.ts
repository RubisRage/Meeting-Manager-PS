import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-desplegable',
  templateUrl: './org-desplegable.component.html',
  styleUrls: ['./org-desplegable.component.css']
})
export class OrgDesplegableComponent implements OnInit {
  Organizaciones=[
    "Padel", "Universidad", "Trabajo"
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
