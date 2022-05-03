import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup-form/signup-form.component';
import { FormsModule } from "@angular/forms";
import {AuthHelperService} from "./services/auth-helper.service";
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import { OrgDescriptionComponent } from './organization/org-description/org-description.component';
import { MembersComponent } from './organization/members/members.component';
import { MainOrganizationComponent } from './main/main-organization/main-organization.component';
import { HeaderDisplayComponent } from './organization/header-display/header-display.component';
import { OrganizationDisplayComponent } from './organization/header-display/organization-display/organization-display.component';
import { ProfileDisplayComponent } from './organization/header-display/profile-display/profile-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { PreOrgScreenComponent } from './pre-org-screen/pre-org-screen.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MainOrganizationComponent,
    CreateOrganizationComponent,
    EditProfileComponent,
    OrgDescriptionComponent,
    MembersComponent,
    MainOrganizationComponent,
    HeaderDisplayComponent,
    OrganizationDisplayComponent,
    ProfileDisplayComponent,
    PreOrgScreenComponent,
    ErrorPageComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    AuthHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
