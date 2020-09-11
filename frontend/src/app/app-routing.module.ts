import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhasergameComponent } from './phasergame/phasergame.component';
import { Phasergame2Component } from './phasergame2/phasergame2.component';
import { Phasergame3Component } from './phasergame3/phasergame3.component'
import { CharactersComponent } from './characters/characters.component';


const routes: Routes = [

  {path: "home", component: LandingPageComponent},
  {path: "charselect", component: CharactersComponent},
  {path: "game", component:PhasergameComponent},
  {path: "game2", component:Phasergame2Component},
  {path: "game3", component:Phasergame3Component},
  
  {path: "", redirectTo: '/home', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
