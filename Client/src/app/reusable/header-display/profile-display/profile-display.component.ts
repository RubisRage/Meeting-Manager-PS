import { Component, OnInit, Input } from '@angular/core';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {

  username: string;
  userlogin!: {username:string, fullname:string, imgURL:string};
  fullname: string;
  imgURL: string;
  @Input() showAdd!: boolean;
  show: boolean;

  constructor(private http: HttpHelperService, 
    public auth: AuthHelperService, private authService:AuthHelperService) { 
    this.username = "";
    this.fullname = "";
    this.imgURL = "";
    this.show = false;
  }

  ngOnInit(): void {
    this.http.get(environment.backend + "/users/" + this.authService.user?.username)
    .subscribe(
      (data) => {
        this.userlogin = data;
        this.username = this.userlogin.username;
        this.imgURL = this.userlogin.imgURL;
      }
    );
  }

  changeShowAdd(): void {
    this.showAdd = !this.showAdd;
    console.log(this.showAdd);
  }

  displayOrganization(){
    this.show = true;

  }

  closeOrganization(){
    this.show = false;
  }

  closeSession(){
    this.auth.logout();
  }

}
