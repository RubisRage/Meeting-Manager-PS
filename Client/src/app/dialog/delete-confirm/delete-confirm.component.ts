import { Component, OnInit, Inject } from '@angular/core';
import{MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog"
import {AuthHelperService} from "../../services/auth-helper.service";


@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  username="";
  show_error!: boolean;

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
              private auth: AuthHelperService,
              @Inject(MAT_DIALOG_DATA) public message: string) {}

  closeDialog(): void{
    this.dialogRef.close(false);
  }
  confirmDialog(): void{
    if (this.username == this.auth.user!.username){
      this.dialogRef.close(true);
    }else{
      this.show_error = true;

    }
  }

  ngOnInit(): void {
    this.show_error = false;
  }

}
