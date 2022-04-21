import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { MainOrganizationComponent } from './organization/main-organization/main-organization.component';
import { SignUpComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  {path: "", component: LoginComponent, pathMatch: 'full'},
  {path: "login" , component: LoginComponent},
  {path: "signup", component:SignUpComponent},
  {path: "organization", component:MainOrganizationComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
