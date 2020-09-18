import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhasergameComponent } from './phasergame/phasergame.component';
import { AboutUsComponent } from "./about-us/about-us.component";
import { CharactersComponent } from './characters/characters.component';

const routes: Routes = [

  {path: "home", component: LandingPageComponent},
  {path: "charselect", component: CharactersComponent},
  {path: "game", component: PhasergameComponent},
  {path: "aboutus", component: AboutUsComponent},
  {path: "", redirectTo: '/home', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
