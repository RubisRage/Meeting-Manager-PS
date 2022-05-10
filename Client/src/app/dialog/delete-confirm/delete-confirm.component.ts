import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import{MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog"
import {UserService} from "../../services/user.service";
import {User} from "../../types/user";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit, OnDestroy {

  user!: User;
  userSubscription!: Subscription;
  username="";
  show_error!: boolean;

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public message: string)
  {
    this.userSubscription = this.userService.user$.subscribe(user => {
      if(user){
        this.user = user;
      }
    })
  }

  closeDialog(): void{
    this.dialogRef.close(false);
  }
  confirmDialog(): void{
    if (this.username == this.user.username){
      this.dialogRef.close(true);
    }else{
      this.show_error = true;

    }
  }

  ngOnInit(): void {
    this.show_error = false;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
