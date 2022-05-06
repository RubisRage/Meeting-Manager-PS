import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { environment } from 'src/environments/environment';
import { HttpHelperService } from '../../services/http-helper.service';

@Component({
  selector: 'app-pre-org-screen',
  templateUrl: './pre-org-screen.component.html',
  styleUrls: ['./pre-org-screen.component.css']
})
export class PreOrgScreenComponent implements OnInit {

  organizations!: {id:number, name:string}[];

  constructor(private http: HttpHelperService,
    private authService:AuthHelperService) { }

  ngOnInit(): void {
    /*
    this.organizations = [
      {id:1, name:"Padel"},
      {id:2, name:"Boxeo"},
      {id:3, name:"Produccion de Software"},
      {id:4, name:"Clase"},
    ];
    */
    
    this.http.get(environment.backend + "/users/" + this.authService.user?.username + "/organizations")
      .subscribe(
        (data) => {
          this.organizations = data;
        }
      );
  }

  

}
