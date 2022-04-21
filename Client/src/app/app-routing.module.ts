import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupFormComponent} from "./signup-form/signup-form.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "sign-up",
    component: SignupFormComponent
  },
  {
    path:  '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
