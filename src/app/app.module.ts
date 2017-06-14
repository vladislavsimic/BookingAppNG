import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker'; //for datetime
import {AppUrl} from "./appservice/AppUrl.services"
import {HttpCountryService} from "./country/country.service";
import {HttpRoomService} from "./room/room.service";
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



const Routes=[
  {path: "country",component:CountryComponent},
  {path: "country-add",component:CountryAddComponent},
  {path: "country-edit",component:CountryEditComponent},
  {path: "place",component:PlaceComponent},
  {path: "accomodation",component:AccomodationComponent},
  {path: "accomodation-type",component:AccomodationtypeComponent},
  {path: "comment",component:CommentComponent},
  {path: "region",component:RegionComponent},
  {path: "room-reservation",component:RoomReservationComponent},
  {path: "room",component:RoomComponent},
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
    CommentEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    NguiDatetimePickerModule
   
  ],
  providers: [HttpCountryService,AppUrl,HttpRoomService,HttpRoomReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
