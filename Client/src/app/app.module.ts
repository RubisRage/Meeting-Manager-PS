import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup-form/signup-form.component';
import { MainOrganizacionComponent } from './organizacion/main-organizacion/main-organizacion.component';
import { CabeceraComponent } from './organizacion/cabecera/cabecera.component';
import { PerfilComponent } from './organizacion/cabecera/perfil/perfil.component';
import { OrgDesplegableComponent } from './organizacion/cabecera/org-desplegable/org-desplegable.component';
import { FormsModule } from "@angular/forms";
import {AuthHelperService} from "./services/auth-helper.service";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MainOrganizacionComponent,
    CabeceraComponent,
    PerfilComponent,
    OrgDesplegableComponent,
    EditProfileComponent
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
