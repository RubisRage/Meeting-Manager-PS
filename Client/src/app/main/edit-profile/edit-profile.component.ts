import {Component, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import {environment} from "../../../environments/environment"
import {HttpHelperService} from "../../services/http-helper.service";
import {AuthHelperService} from "../../services/auth-helper.service";
import { MatDialog } from "@angular/material/dialog";
import {DeleteConfirmComponent} from "../../dialog/delete-confirm/delete-confirm.component";
import { User } from 'src/app/types/user';
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})


export class EditProfileComponent implements OnDestroy {

  user!: User;
  private userSubscription: Subscription;

  model = {
    username:"",
    fullname:"",
    oldPassword:"",
    newPassword:"",
  }

  constructor(public router: Router,
              public dialog: MatDialog,
              public userService: UserService,
              private http: HttpHelperService,
              private auth: AuthHelperService)
  {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ChangeUsername(){
    this.userService.updateUser(this.model.username);
  }

  ChangeRealname(){
    this.userService.updateUser(undefined, this.user.fullname);
  }

  ChangePassword(){
    this.http.put(environment.backend+"/users/"+this.user.username +"/password",{
      oldPassword:this.model.oldPassword,
      newPassword:this.model.newPassword
    }).subscribe();
  }


  Delete() : void{
    this.dialog.open(DeleteConfirmComponent,{
      data: '¿Deseas borrar la cuenta?'
    })
      .afterClosed()
      .subscribe((confirm: boolean) =>{
        if(confirm){
          this.http.delete(environment.backend+"/users/" + this.user.username)
            .subscribe()
          this.auth.logout();
          this.router.navigate(['/login'])


        }

      }

        );

  }
}
