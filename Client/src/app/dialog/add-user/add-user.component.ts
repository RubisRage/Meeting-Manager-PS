import { Component, OnInit, Inject } from '@angular/core';
import{MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog"
import {AuthHelperService} from "../../services/auth-helper.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  username = "";

  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              private auth: AuthHelperService,
              @Inject(MAT_DIALOG_DATA) public message: string) {}


  add() : void{
    this.dialogRef.close(true);


  }
  close() : void{
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }

}
