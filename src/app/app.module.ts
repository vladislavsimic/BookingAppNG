import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import {AppUrl} from "./appservice/AppUrl.services"
import {HttpCountryService} from "./country/country.service";
import {HttpPlaceService} from "./place/place.service";
import {HttpRegionService} from "./region/region.service";


import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { CountryAddComponent } from './country/country-add/country-add.component';
import { PlaceComponent } from './place/place.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { AccomodationtypeComponent } from './accomodationtype/accomodationtype.component';
import { CommentComponent } from './comment/comment.component';
import { RegionComponent } from './region/region.component';
import { RoomreservationComponent } from './roomreservation/roomreservation.component';
import { RoomComponent } from './room/room.component';
import { CountryEditComponent } from './country/country-edit/country-edit.component';
import { PlaceAddComponent } from './place/place-add/place-add.component';
import { PlaceEditComponent } from './place/place-edit/place-edit.component'

const Routes=[
  {path: "country",component:CountryComponent},
  {path: "country-add",component:CountryAddComponent},
  {path: "country-edit",component:CountryEditComponent},
  {path: "place",component:PlaceComponent},
  {path: "place-add",component:PlaceAddComponent},
  {path: "place-edit",component:PlaceEditComponent},
  {path: "accomodation",component:AccomodationComponent},
  {path: "accomodation-type",component:AccomodationtypeComponent},
  {path: "comment",component:CommentComponent},
  {path: "region",component:RegionComponent},
  {path: "room-reservation",component:RoomreservationComponent},
  {path: "room",component:RoomComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    CountryAddComponent,
    PlaceComponent,
    AccomodationComponent,
    AccomodationtypeComponent,
    CommentComponent,
    RegionComponent,
    RoomreservationComponent,
    RoomComponent,
    CountryEditComponent,
    PlaceAddComponent,
    PlaceEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [HttpCountryService,AppUrl,HttpPlaceService,HttpRegionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
