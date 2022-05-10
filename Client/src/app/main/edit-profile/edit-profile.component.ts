import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {environment} from "../../../environments/environment"
import {HttpHelperService} from "../../services/http-helper.service";
import {AuthHelperService} from "../../services/auth-helper.service";
import { MatDialog } from "@angular/material/dialog";
import {DeleteConfirmComponent} from "../../dialog/delete-confirm/delete-confirm.component";
import { User } from 'src/app/types/user';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})


export class EditProfileComponent implements OnInit{

  show_error = false

  user={
    username:"",
    fullname:"",
    oldPassword:"",
    newPassword:"",
  }


  constructor(public router: Router,
              public dialog: MatDialog,
              public authService: AuthHelperService,
              private http: HttpHelperService,
              private auth: AuthHelperService) { }

  ChangeUsername(){
    this.auth.updateUser(this.user.username);
  }

  ChangeRealname(){
    this.auth.updateUser(undefined , this.user.fullname);
  }

  ChangePassword(){
    this.http.put(environment.backend+"/users/"+this.auth.user!.username +"/password",{
      oldPassword:this.user.oldPassword,
      newPassword:this.user.newPassword
    }).subscribe();
  }


  Delete() : void{
    this.dialog.open<DeleteConfirmComponent,string,boolean>(DeleteConfirmComponent,{
      data: '¿Deseas borrar la cuenta?'
    })
      .afterClosed()
      .subscribe((confirm) =>{
        if(confirm){
          this.http.delete(environment.backend+"/users/" + this.auth.user!.username)
            .subscribe({
              next:() =>{
                this.auth.logout();
                this.router.navigate(['/login'])
          },
              error : res=>{
                this.show_error=true
              }
            })



        }

      }

        );

  }



  ngOnInit(): void {


  }

}
