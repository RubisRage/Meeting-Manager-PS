import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./main/unlogged/login/login.component";
import { MainOrganizationComponent } from './main/main-organization/main-organization.component';
import { SignUpComponent } from './main/unlogged/signup-form/signup-form.component';
import { EditProfileComponent } from './main/edit-profile/edit-profile.component'
import { HeaderDisplayComponent } from './reusable/header-display/header-display.component';
import { PreOrgScreenComponent } from './main/pre-org-screen/pre-org-screen.component';
import { ErrorPageComponent } from './main/error-page/error-page.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path: "", component: LoginComponent, pathMatch: 'full'},
  {path: "login" , component: LoginComponent},
  {path: "signup", component:SignUpComponent},
  {path: "main", component:MainComponent},
  {path: "edit-profile", component: EditProfileComponent},
  {path: "organization", component:PreOrgScreenComponent},
  {path: "organization/:id", component:MainOrganizationComponent},
  {path: "header-display", component:HeaderDisplayComponent},
  {path: "**", component:ErrorPageComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
