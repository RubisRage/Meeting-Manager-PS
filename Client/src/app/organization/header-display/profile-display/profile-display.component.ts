import { Component, OnInit, Input } from '@angular/core';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {

  userToken = "MasterJoseph";
  username: string;
  userlogin!: {username:string, fullname:string, imgURL:string};
  fullname: string;
  imgURL: string;
  @Input() showAdd: boolean= true;

  constructor(private http: HttpHelperService) { 
    this.username = "";
    this.fullname = "";
    this.imgURL = "";
  }

  ngOnInit(): void {
    this.http.get(environment.backend + "/users/" + this.userToken)
    .subscribe(
      (data) => {
        this.userlogin = data;
        this.username = this.userlogin.username;
        this.imgURL = this.userlogin.imgURL;
      }
    );
  }

  changeShowAdd(): void {
    if (this.showAdd == true){
      this.showAdd = false;
    }else if (this.showAdd == false){
      this.showAdd = true;
    }
  }

}
