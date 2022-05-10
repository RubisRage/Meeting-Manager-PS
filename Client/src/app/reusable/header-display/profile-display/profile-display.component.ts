import { Component, OnInit, Input } from '@angular/core';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { environment } from "../../../../environments/environment";
import {UserService} from "../../../services/user.service";
import {User} from "../../../types/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {
  username: string;
  userlogin!: User;
  fullname: string;
  imgURL: string;
  @Input() showAdd!: boolean;
  show: boolean;

  private user!: User;
  private subscription!: Subscription;

  constructor(
    private http: HttpHelperService,
    private userService: UserService,
    private auth: AuthHelperService
  )
  {
    this.username = "";
    this.fullname = "";
    this.imgURL = "";
    this.show = false;
  }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe(user => {
      this.userlogin = user;
      this.username = this.userlogin.username;
      if(this.userlogin.imgURL) {
        this.imgURL = this.userlogin.imgURL;
      }
    });
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
