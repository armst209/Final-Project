import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhasergameComponent, MainScene } from './phasergame/phasergame.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HighscoresComponent } from './highscores/highscores.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    LandingPageComponent,
    PhasergameComponent,
    MainScene,
    AboutUsComponent,
    HighscoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
