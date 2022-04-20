import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { MainOrganizacionComponent } from './organizacion/main-organizacion/main-organizacion.component';
import { SignUpComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component:SignUpComponent},
  {path: "organizaciones", component:MainOrganizacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
