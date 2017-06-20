import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Accommodation} from "../accommodation.model"
import {AccomodationType} from 'app/accomodationtype/accomodationtype.model'
import {Place} from 'app/place/place.model'
import {Http, Headers, Response } from '@angular/http';
import {HttpAccommodationService} from "../accommodation.service"
import {HttpAccomodationTypeService} from "app/accomodationtype/accomodationtype.service"
import {HttpPlaceService} from "app/place/place.service"
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Room} from "app/room/room.model";
import {HttpRoomReservationService} from "app/roomreservation/roomreservation.service"
import {RoomReservation} from "app/roomreservation/roomreservation.model"
import {HttpRoomService} from "app/room/room.service"
import {RoomEditComponent} from "app/room/room-edit/room-edit.component"

@Component({
  selector: 'app-accomodation-details',
  templateUrl: './accomodation-details.component.html',
  styleUrls: ['./accomodation-details.component.css'],
  providers: [HttpAccommodationService,HttpAccomodationTypeService]
})
export class AccomodationDetailsComponent implements OnInit {

 public detAccomodation : Accommodation;
 public detAccomodationCopy : any;
 public rooms : Array<Room>;
 public nRoomReservation:RoomReservation;
 public managerRole:boolean;
 public role:string;
 
  constructor(private httpAccommodationService:HttpAccommodationService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              private router: Router,
              private httpRoomReservationService:HttpRoomReservationService,
              public dialogRef: MdDialogRef<AccomodationDetailsComponent>,
              private httpRoomService:HttpRoomService,
              public dialog:MdDialog) 
              {
                this.detAccomodationCopy = dialogRef._containerInstance.dialogConfig.data;
                
              }
 
  ngOnInit() {
    this.managerRole=false;
    this.createPermisions();

    this.httpAccommodationService.getAccommodation(this.dialogRef._containerInstance.dialogConfig.data.Id).subscribe(
      (res: any) => {this.detAccomodationCopy = res; console.log(this.detAccomodationCopy)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
   // this.detAccomodationCopy = this.detAccomodation;
  }
  
  createPermisions(){
    this.role=localStorage.getItem('role');
    if(this.role=="Manager"){
      this.managerRole=true;
    }
  }
  
  saveRoomReservation(roomRes: RoomReservation, form: NgForm){
       

       this.httpRoomReservationService.postRoomReservations(roomRes).subscribe(
          ()=>{ 
            console.log('RoomRes successfuly posted');
            //this.router.navigate(['/room-reservation']);
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
  getNotification(evt) {
      this.ngOnInit();
  }

  deleteRoom(room:Room){
    this.httpRoomService.deleteRoom(room.Id).subscribe(
      ()=>{
      console.log('Room ' + room.Id + ' successfuly deleted');
      this.ngOnInit();
      },
      error=>{alert("Room ' + room.ID + ' failed delete!"); console.log(error);}
    );
  }

  editRoom(room:Room){
      let dialogRef = this.dialog.open(RoomEditComponent);
      dialogRef.componentInstance.eRoom=room;

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
    })
  }

}
