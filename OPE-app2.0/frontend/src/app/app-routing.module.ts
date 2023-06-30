import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./services/auth-guard.service";

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddprodComponent } from './components/addprod/addprod.component';
import { SavedevalComponent } from './components/savedeval/savedeval.component';
import { ProdevalComponent } from './components/prodeval/prodeval.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { AboutComponent } from './components/about/about.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ContactComponent } from './components/contact/contact.component';
import { OtpComponent } from './components/otp/otp.component';

const routes: Routes = [

  { path: "", component: HomepageComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  // { path: "savedeval", component: SavedevalComponent, canActivate: [AuthGuard] },
  { path: "savedeval", component: SavedevalComponent},
  // { path: "addprod", component: AddprodComponent, canActivate: [AuthGuard] },
  { path: "addprod", component: AddprodComponent },
  // { path: "prodeval", component: ProdevalComponent, canActivate: [AuthGuard] },
  { path: "prodeval", component: ProdevalComponent },
  { path: "analysis", component: AnalysisComponent },
  { path: "about", component: AboutComponent },
  { path: "how-it-works", component: HowItWorksComponent },
  { path: "contact", component: ContactComponent },
  { path: "otp", component: OtpComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
