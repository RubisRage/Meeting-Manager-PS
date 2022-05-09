import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  seguro!: {id:number, name:string}[];

  constructor(private http: HttpHelperService,
    private authService:AuthHelperService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    setInterval( () => {
    this.http.get(environment.backend + "/users/" + this.authService.user?.username + "/organizations")
      .subscribe(
        (data) => {
//          if(this.equeals(this.seguro,data)){
            this.organizations = data;
  //        }
        }
      );},1000);
      this.organizations = this.seguro;
  }

/*   equeals(e1:{id:number, name:string}[], p2: any): Boolean{
    if (e1.length != p2.length) return false;
    
    for (var i = 0; i < p2.length; i++) {
      if (e1[i].id !== p2[i].id && e1[i].name === p2[i].name){
        return false;
      }
    }  
    return true;
  };  */   
}