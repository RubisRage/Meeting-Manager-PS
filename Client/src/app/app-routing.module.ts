import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { MainOrganizationComponent } from './organization/main-organization/main-organization.component';
import { SignUpComponent } from './signup-form/signup-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { OrganizationDisplayComponent } from './organization/header-display/organization-display/organization-display.component';

const routes: Routes = [
  {path: "", component: LoginComponent, pathMatch: 'full'},
  {path: "login" , component: LoginComponent},
  {path: "signup", component:SignUpComponent},
  {path: "edit-profile", component: EditProfileComponent},
  {path: "organization", component:MainOrganizationComponent},
  {path: "organization-display", component:OrganizationDisplayComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
