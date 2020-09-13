import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhasergameComponent } from './phasergame/phasergame.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    LandingPageComponent,
    PhasergameComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
