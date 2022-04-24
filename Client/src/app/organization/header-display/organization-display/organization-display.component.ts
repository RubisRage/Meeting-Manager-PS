import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.css']
})
export class OrganizationDisplayComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

  displayOrganization(){
    var element = document.getElementById('display')!;
    element.setAttribute("style","display: block;");
  }

  closeOrganization(){
    var element = document.getElementById('display')!;
    element.setAttribute("style","display: none;");
  }

}
