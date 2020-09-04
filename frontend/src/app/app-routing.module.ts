import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhasergameComponent } from './phasergame/phasergame.component';

const routes: Routes = [

  {path: "home", component: LandingPageComponent},
  {path: "game", component: PhasergameComponent},
  {path: "", redirectTo: '/home', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
