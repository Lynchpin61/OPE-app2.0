import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";

import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddprodComponent } from './components/addprod/addprod.component';
import { SavedevalComponent } from './components/savedeval/savedeval.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    HomepageComponent,
    AddprodComponent,
    SavedevalComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
