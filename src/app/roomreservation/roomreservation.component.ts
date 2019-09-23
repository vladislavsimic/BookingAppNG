import { Component, OnInit } from '@angular/core';
import {Reservation} from "./roomreservation.model"
import { Http, Response } from '@angular/http';
import {HttpRoomReservationService} from "./roomreservation.service"
import { Observable } from "rxjs/Observable";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-roomreservation',
  templateUrl: './roomreservation.component.html',
  styleUrls: ['./roomreservation.component.css']
})
export class RoomReservationComponent implements OnInit {


  private roomReservations:Array<Reservation>;
  private editFlag;
  roomreservation:any;

  constructor(private httpRoomResService:HttpRoomReservationService,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
     this.editFlag=false;
     this.httpRoomResService.getRoomsReservations().subscribe(
      (res: any) => {this.roomReservations = res; console.log(this.roomReservations)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

   getNotification(evt) {
      this.ngOnInit();
  }

  editClick(roomRes:Reservation){
    this.editFlag=true;
    this.roomreservation=roomRes;
  }

  delete(roomRes:Reservation){

    this.httpRoomResService.deleteRoomReservation(roomRes.Id).subscribe(
      ()=>{
      console.log('RoomRes ' + roomRes.Id + ' successfuly deleted');
      this.snackBar.open("RoomRes " + roomRes.Id + " successfuly deleted", "", { duration: 2500,});
      this.ngOnInit();
      },
      error=>{alert("Country ' + country.Name + ' failed delete!"); console.log(error);}
      
    );
  }
}


