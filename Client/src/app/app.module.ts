import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup-form/signup-form.component';
import { FormsModule } from "@angular/forms";
import {AuthHelperService} from "./services/auth-helper.service";
import { OrgDescriptionComponent } from './organization/org-description/org-description.component';
import { MembersComponent } from './organization/members/members.component';
import { HeaderComponent } from './organization/header/header.component';
import { MainOrganizationComponent } from './organization/main-organization/main-organization.component';
import { ProfileComponent } from './organization/header/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    OrgDescriptionComponent,
    MembersComponent,
    HeaderComponent,
    MainOrganizationComponent,
    ProfileComponent,
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
