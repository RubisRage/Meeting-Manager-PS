import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { MainOrganizacionComponent } from './organizacion/main-organizacion/main-organizacion.component';
import { SignUpComponent } from './signup-form/signup-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'

const routes: Routes = [
  {path: "", component: LoginComponent, pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "signup", component:SignUpComponent},
  {path: "organization", component:MainOrganizacionComponent},
  {path: "edit-profile", component: EditProfileComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
