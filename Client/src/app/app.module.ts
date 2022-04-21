import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { SignupFormComponent } from './signup-form/signup-form.component';
import {AuthHelperService} from "./services/auth-helper.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
