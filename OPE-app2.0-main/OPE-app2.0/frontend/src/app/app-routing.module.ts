import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AddprodComponent } from './components/addprod/addprod.component';
import { SavedevalComponent } from './components/savedeval/savedeval.component';
import { ProdevalComponent } from './components/prodeval/prodeval.component';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "savedeval", component: SavedevalComponent },
  { path: "addprod", component: AddprodComponent },
  { path: "prodeval", component: ProdevalComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
