import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpHelperService} from "../services/http-helper.service";
import {environment} from "../../environments/environment";

@Component({
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent {

  model = {
    name: "",
    description: "",
    imgURL: "assets/pictures/org_default_picture.svg"
  }

  constructor(public dialogRef: MatDialogRef<CreateOrganizationComponent>,
              private http: HttpHelperService) { }

  onSubmit() {

    this.http.post(`${environment.backend}/organizations`, this.model)
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: err => {
          console.log(err);
        }
      })
  }

  onSelectedFile(event: Event) {
    if(event.target && (event.target! as HTMLInputElement).files) {
      const file = (event.target! as HTMLInputElement).files![0];

      this.http.post(`${environment.backend}/images`, {
        img: file
      }).subscribe({
        next: response => {
          this.model.imgURL = response.imgURL;
        }
      });
    }
  }

}
