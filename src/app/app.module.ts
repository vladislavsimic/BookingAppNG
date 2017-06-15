import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker'; //for datetime
import {AppUrl} from "./appservice/AppUrl.services"
import {HttpCountryService} from "./country/country.service";
import {HttpRoomService} from "./room/room.service";
import {HttpPlaceService} from "./place/place.service";
import {HttpRegionService} from "./region/region.service";
import {HttpAccomodationTypeService} from "./accomodationtype/accomodationtype.service";
import {HttpAccommodationService} from "./accomodation/accommodation.service"
import {HttpRegisterService} from "./register/register.service"

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { CountryAddComponent } from './country/country-add/country-add.component';
import { PlaceComponent } from './place/place.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { AccomodationtypeComponent } from './accomodationtype/accomodationtype.component';
import { CommentComponent } from './comment/comment.component';
import { RegionComponent } from './region/region.component';
import { RoomReservationComponent } from './roomreservation/roomreservation.component';
import { RoomComponent } from './room/room.component';
import { CountryEditComponent } from './country/country-edit/country-edit.component';
import { RoomAddComponent } from './room/room-add/room-add.component';
import { RoomEditComponent } from './room/room-edit/room-edit.component';
import { RoomReservationAddComponent } from './roomreservation/room-reservation-add/room-reservation-add.component';
import { RoomReservationEditComponent } from './roomreservation/room-reservation-edit/room-reservation-edit.component';
import {HttpRoomReservationService}  from './roomreservation/roomreservation.service';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import { CommentEditComponent } from './comment/comment-edit/comment-edit.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MaterialModule} from '@angular/material/';
import { PlaceAddComponent } from './place/place-add/place-add.component';
import { PlaceEditComponent } from './place/place-edit/place-edit.component';
import { AccomodationtypeAddComponent } from './accomodationtype/accomodationtype-add/accomodationtype-add.component';
import { AccomodationtypeEditComponent } from './accomodationtype/accomodationtype-edit/accomodationtype-edit.component';
import { AccommodationAddComponent } from './accomodation/accommodation-add/accommodation-add.component';
import { AccommodationEditComponent } from './accomodation/accommodation-edit/accommodation-edit.component';
import { RegionAddComponent } from './region/region-add/region-add.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegionEditComponent } from './region/region-edit/region-edit.component'
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


const Routes=[
  {path: "country",component:CountryComponent},
  {path: "country-add",component:CountryAddComponent},
  {path: "country-edit",component:CountryEditComponent},
  {path: "place",component:PlaceComponent},
  {path: "place-add",component:PlaceAddComponent},
  {path: "place-edit",component:PlaceEditComponent},
  {path: "accomodation",component:AccomodationComponent},
  {path: "accommodation-add",component:AccommodationAddComponent},
  {path: "accommodation-edit",component:AccommodationEditComponent},
  {path: "accomodation-type",component:AccomodationtypeComponent},
  {path: "accomodation-type-edit",component:AccomodationtypeEditComponent},
  {path: "accomodation-type-add",component:AccomodationtypeAddComponent},
  {path: "comment",component:CommentComponent},
  {path: "region",component:RegionComponent},
  {path: "room-reservation",component:RoomReservationComponent},
  {path: "region-add",component:RegionAddComponent},
  {path: "region-edit",component:RegionEditComponent},
  {path: "room-reservation",component:RoomReservationComponent},
  {path: "room",component:RoomComponent},
  {path: "register",component:RegisterComponent},
  {path: "room-add",component:RoomAddComponent},
  {path: "room-edit",component:RoomEditComponent},
  {path: "room-reservation-add",component:RoomReservationAddComponent},
  {path: "room-reservation-edit",component:RoomReservationEditComponent},
  {path: "room-reservation-add",component:RoomReservationAddComponent},
  {path: "room-reservation-edit",component:RoomReservationEditComponent},
  {path: "comment-add",component:CommentAddComponent},
  {path: "comment-edit",component:CommentEditComponent},
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
    RoomReservationComponent,
    RoomComponent,
    CountryEditComponent,
    RoomAddComponent,
    RoomEditComponent,
    RoomReservationComponent,
    RoomReservationAddComponent,
    RoomReservationEditComponent,
    CommentAddComponent,
    CommentEditComponent,
    PlaceAddComponent,
    PlaceEditComponent,
    AccomodationtypeAddComponent,
    AccomodationtypeEditComponent,
    AccommodationAddComponent,
    AccommodationEditComponent,
    RegionAddComponent,
    RegionEditComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    NguiDatetimePickerModule,
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MaterialModule,
    BrowserAnimationsModule,
   
  ],

  providers: [HttpCountryService,AppUrl,HttpPlaceService,HttpRegionService,HttpAccomodationTypeService,
  HttpAccommodationService,HttpRoomService,HttpRoomReservationService,HttpRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
