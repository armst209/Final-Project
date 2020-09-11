import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhasergameComponent } from './phasergame/phasergame.component';
import { Phasergame2Component } from './phasergame2/phasergame2.component';
import { Phasergame3Component } from './phasergame3/phasergame3.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    LandingPageComponent,
    PhasergameComponent,
    Phasergame2Component,
    Phasergame3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
