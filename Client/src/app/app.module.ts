import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/unlogged/login/login.component';
import { SignUpComponent } from './main/unlogged/signup-form/signup-form.component';
import { FormsModule } from "@angular/forms";
import {AuthHelperService} from "./services/auth-helper.service";
import { CreateOrganizationComponent } from './dialog/create-organization/create-organization.component';
import {EditProfileComponent} from "./main/edit-profile/edit-profile.component";
import { OrgDescriptionComponent } from './reusable/org-description/org-description.component';
import { MembersComponent } from './reusable/members/members.component';
import { MainOrganizationComponent } from './main/main-organization/main-organization.component';
import { HeaderDisplayComponent } from './reusable/header-display/header-display.component';
import { OrganizationDisplayComponent } from './reusable/header-display/organization-display/organization-display.component';
import { ProfileDisplayComponent } from './reusable/header-display/profile-display/profile-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { PreOrgScreenComponent } from './main/pre-org-screen/pre-org-screen.component';
import { ErrorPageComponent } from './main/error-page/error-page.component';
import { MainComponent } from './main/main.component';
import { CommissionDisplayComponent } from './reusable/header-display/commission-display/commission-display.component';
import { UserRoleDisplayComponent } from './reusable/header-display/user-role-display/user-role-display.component';

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
    CommissionDisplayComponent,
    UserRoleDisplayComponent,
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
