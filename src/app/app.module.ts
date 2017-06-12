import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

import {AppUrl} from "./services/AppUrl.services"
import {HttpCountryService} from "./services/country.service"

const Routes=[
  {path: "test",component:TestComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
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
