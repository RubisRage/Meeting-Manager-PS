import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-display',
  templateUrl: './header-display.component.html',
  styleUrls: ['./header-display.component.css']
})
export class HeaderDisplayComponent implements OnInit {

  show!: boolean ;

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    this.showCommission();
    this.router.events.subscribe(()=>this.showCommission());
  }

  async showCommission(){
      const url = this.router.url;
      let segments: string[] = url.split("/");
      this.show = segments[2] === "organization"
                  && segments[3] !== undefined;
  }
}
