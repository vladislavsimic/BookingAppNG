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
import {HttpAccomodationServicesService} from "./accomodation-services/accomodation-service.service"
import {HttpAccommodationService} from "./accomodation/accommodation.service"
import {HttpRegisterService} from "./register/register.service" 
import {HttpAuthenticationService} from "./login/userAuthentication.service"
import { AppComponent } from './app.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { AccomodationtypeComponent } from './accomodationtype/accomodationtype.component';
import { CommentComponent } from './comment/comment.component';
import { RoomReservationComponent } from './roomreservation/roomreservation.component';
import { RoomComponent } from './room/room.component';
import { RoomAddComponent } from './room/room-add/room-add.component';
import { RoomEditComponent } from './room/room-edit/room-edit.component';
import { RoomReservationEditComponent } from './roomreservation/room-reservation-edit/room-reservation-edit.component';
import {HttpReservationService}  from './reservation/reservation.service';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import { CommentEditComponent } from './comment/comment-edit/comment-edit.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MaterialModule,MdNativeDateModule,MdSnackBarModule} from '@angular/material/';
import { AccomodationtypeAddComponent } from './accomodationtype/accomodationtype-add/accomodationtype-add.component';
import { AccomodationtypeEditComponent } from './accomodationtype/accomodationtype-edit/accomodationtype-edit.component';
import { AccommodationAddComponent } from './accomodation/accommodation-add/accommodation-add.component';
import { AccommodationEditComponent } from './accomodation/accommodation-edit/accommodation-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegionEditComponent } from './region/region-edit/region-edit.component'
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {AdminGuard} from './adminGuard';
import {ManagerGuard} from './managerGuard';
import { AccomodationDetailsComponent } from './accomodation/accomodation-details/accomodation-details.component';
import {HttpCommentService} from "app/comment/comment.service";
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { SearchComponent } from './search/search.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ManagersComponent } from './managers/managers.component';
import {HttpUsersService} from "app/managers/users.service";
import {FilterService} from "app/search/search.service";
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationAddComponent } from './reservation/reservation-add/reservation-add.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
import { RatingComponent } from './rating/rating.component';
import { HttpRatingService } from './rating/rating.service';
import { AccomodationServicesComponent } from './accomodation-services/accomodation-services.component';
import { AccomodationServicesAddComponent } from './accomodation-services/accomodation-services-add/accomodation-services-add.component';
import { AccomodationServicesEditComponent } from './accomodation-services/accomodation-services-edit/accomodation-services-edit.component';


const Routes=[
  {path: "accomodation",component:AccomodationComponent},
  {path:"accomodation-view", component:AccomodationDetailsComponent},
  {path: "accommodation-add",component:AccommodationAddComponent, canActivate: [ManagerGuard]},
  {path: "accommodation-edit",component:AccommodationEditComponent, canActivate: [ManagerGuard]},
  {path: "accomodation-type",component:AccomodationtypeComponent, canActivate: [AdminGuard]},
  {path: "accomodation-type-edit",component:AccomodationtypeEditComponent, canActivate: [AdminGuard]},
  {path: "accomodation-type-add",component:AccomodationtypeAddComponent, canActivate: [AdminGuard]},
  {path: "accomodation-services", component:AccomodationServicesComponent, canActivate:[AdminGuard]},
  {path: "accomodation-service-add",component:AccomodationServicesAddComponent, canActivate: [AdminGuard]},
  {path: "accomodation-service-edit",component:AccomodationServicesEditComponent, canActivate: [AdminGuard]},
  {path: "comment",component:CommentComponent,canActivate: [AdminGuard]},
  {path: "reservation-view", component:ReservationComponent},
  {path: "room-reservation",component:RoomReservationComponent,canActivate: [AdminGuard]},
  {path: "region-edit",component:RegionEditComponent, canActivate: [AdminGuard]},
  {path: "room",component:RoomComponent,canActivate: [AdminGuard]},
  {path: "register",component:RegisterComponent},
  {path: "login",component:LoginComponent},
  {path: "room-add",component:RoomAddComponent,canActivate: [AdminGuard]},
  {path: "reservation-add", component: ReservationAddComponent},
  {path: "room-edit",component:RoomEditComponent,canActivate: [AdminGuard]},
  {path: "room-reservation-edit",component:RoomReservationEditComponent,canActivate: [AdminGuard]},
  {path: "comment-add",component:CommentAddComponent,canActivate: [AdminGuard]},
  {path: "comment-edit",component:CommentEditComponent,canActivate: [AdminGuard]},
  {path: "home",component:HomeComponent},
  {path:"managers",component:ManagersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AccomodationComponent,
    AccomodationtypeComponent,
    CommentComponent,
    ReservationComponent,
    RoomComponent,
    RoomAddComponent,
    RoomEditComponent,
    RoomReservationComponent,
    ReservationAddComponent,
    RoomReservationEditComponent,
    CommentAddComponent,
    CommentEditComponent,
    AccomodationtypeAddComponent,
    AccomodationtypeEditComponent,
    AccommodationAddComponent,
    AccommodationEditComponent,
    RegionEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccomodationDetailsComponent,
    MapComponent,
    FileSelectDirective,
    FileDropDirective,
    ImageuploadComponent,
    SearchComponent,
    ManagersComponent,
    ReservationComponent,
    ReservationAddComponent,
    ReservationEditComponent,
    RatingComponent,
    AccomodationServicesComponent,
    AccomodationServicesAddComponent,
    AccomodationServicesEditComponent
  ],
  
  entryComponents: [
    AccomodationDetailsComponent, 
    ReservationAddComponent, 
    RatingComponent, 
    ReservationComponent, 
    ImageuploadComponent,
    SearchComponent, 
    RoomAddComponent, 
    RoomEditComponent,
    MapComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    NguiDatetimePickerModule,
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule,
    MaterialModule,
    MdNativeDateModule,
    MdSnackBarModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    //prilikom import-a mape prosleđujemo Google API key koji dobijamo preko google konzole
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAtvp71DTpNaEw59EcmxvFMQOKRyRUiArg'})
   
  ],
   
  providers: [
    HttpCountryService,
    AppUrl,HttpPlaceService,
    HttpRegionService,
    HttpAccomodationTypeService,
    HttpAccommodationService,
    HttpAccomodationServicesService,
    HttpRoomService,
    HttpReservationService,
    HttpRegisterService,
    HttpCommentService,
    HttpAuthenticationService,
    AdminGuard,
    ManagerGuard,
    HttpUsersService,
    FilterService, 
    HttpRatingService],

  bootstrap: [AppComponent]
})

export class AppModule { }
