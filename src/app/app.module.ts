import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import {AppUrl} from "./appservice/AppUrl.services"
import {HttpCountryService} from "./country/country.service";

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { CountryAddComponent } from './country/country-add/country-add.component'

const Routes=[
  {path: "country",component:CountryComponent},
  {path: "country-add",component:CountryAddComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    CountryAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [HttpCountryService,AppUrl],
  bootstrap: [AppComponent]
})
export class AppModule { }
