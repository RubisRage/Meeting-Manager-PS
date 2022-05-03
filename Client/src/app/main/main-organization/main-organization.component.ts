import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-organization',
  templateUrl: './main-organization.component.html',
  styleUrls: ['./main-organization.component.css']
})
export class MainOrganizationComponent implements OnInit {
  bg_src = '../../../assets/pictures/background.png';
  id: number;
  
  
  constructor(private router: Router) {
    let url = this.router.parseUrl(this.router.url);
    this.id = url.queryParams['id'];
  }

  ngOnInit(): void {

  }

}
