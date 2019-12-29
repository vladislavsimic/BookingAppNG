import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Accommodation} from "../accommodation.model"
import {Rating} from "app/rating/rating.model"
import {AccomodationType} from 'app/accomodationtype/accomodationtype.model'
import {Http, Headers, Response } from '@angular/http';
import {HttpAccommodationService} from "../accommodation.service"
import {HttpAccomodationTypeService} from "app/accomodationtype/accomodationtype.service"
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import {Room} from "app/room/room.model";
import {Reservation} from "app/roomreservation/roomreservation.model"
import {HttpRoomService} from "app/room/room.service"
import {MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"
import {ReservationAddComponent} from "app/reservation/reservation-add/reservation-add.component"
import { NavigationExtras } from '@angular/router';
import { HttpRatingService } from 'app/rating/rating.service';
import { AccomodationServices } from 'app/accomodation-services/accomodation-service.model';

@Component({
  selector: 'app-accomodation-details',
  templateUrl: './accomodation-details.component.html',
  styleUrls: ['./accomodation-details.component.css'],
  providers: [HttpAccommodationService,HttpAccomodationTypeService]
})
export class AccomodationDetailsComponent implements OnInit {

 public accomodation : Accommodation;
 public rooms : Array<Room>;
 public nRoomReservation:Reservation;
 public userRole:boolean;
 public adminManagerRole:boolean;
 public role:string;
 private accId:number;
 private accomodationId : string;
 private accName : string;
 private ratings : Array<Rating>;
 mapInfo:MapModel;
 
  constructor(private httpAccommodationService:HttpAccommodationService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              private httpRatingService:HttpRatingService,
              private router: Router,
              private httpRoomService:HttpRoomService,
              private snackBar:MdSnackBar,
              private route: ActivatedRoute,
              public dialog:MdDialog,) 
              {
                  this.route.queryParams.subscribe(params => {
                  this.accomodationId = params["accId"];
                  console.log(this.accomodationId);
                  console.log(params);
                });
              }
 
  ngOnInit() {
    this.userRole=false;
    this.adminManagerRole = false;
    this.createPermisions();

    this.httpRatingService.getAccomodationRatings(this.accomodationId).subscribe(
      (res: any) => { this.ratings = res; console.log(this.ratings)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error); }
    );

    this.httpAccommodationService.getAccommodation(this.accomodationId).subscribe(
      (res: any) => { this.accomodation = res; console.log(this.accomodation)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error); }
    );
  }

  createPermisions(){
    this.role = localStorage.getItem('role');
    if(this.role == "AGENT" || this.role=="ADMIN"){
      this.adminManagerRole=true;
    }
    else if(this.role=="USER"){
      this.userRole=true;
    }
  }
  
  reserveAccomodation(acc:Accommodation){
      let config = new MdDialogConfig();
      config.data = acc;
      config.height='700px';
      config.width='700px';

      let dialogRef = this.dialog.open(ReservationAddComponent,config);
      dialogRef.componentInstance.accomodation = acc;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTotalRating(){
    return this.ratings.map(t => t.overallRating).reduce((acc, value) => acc + value, 0);
  }

  addComment(acc:Accommodation){
    
  }

  showReservations(acc : Accommodation){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          accId: acc.id,
      }
    }
    this.router.navigate(['reservation-view'], navigationExtras);
  }

  locationClick(acc:Accommodation){
    let config = new MdDialogConfig();
    config.height='680px';
    config.width='670px';

    this.mapInfo = new MapModel(acc.address.latitude, acc.address.longitude, 
    "",
    "" , "" , "");

    let dialogRef = this.dialog.open(MapComponent,config);
    dialogRef.componentInstance.watching=true;
    dialogRef.componentInstance.adding=false;
    dialogRef.componentInstance.mapInfo = this.mapInfo;
    dialogRef.componentInstance.accomodation=acc;
  }

}
