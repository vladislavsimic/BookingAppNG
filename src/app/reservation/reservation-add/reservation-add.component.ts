import { Component, OnInit, Input } from '@angular/core';
import {Reservation,ReservationCheck} from "../reservation.model"
import {HttpReservationService} from "../reservation.service"
import {MdSnackBar} from "@angular/material";
import {NgForm} from '@angular/forms';
import {Accommodation} from "app/accomodation/accommodation.model"

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css'],
  providers: [HttpReservationService]
})
export class ReservationAddComponent implements OnInit {

  public nReservation: any={};
  public accomodation : Accommodation;
  private reservationFree : ReservationCheck;

  constructor(private httpReservationService:HttpReservationService,
    private snackBar:MdSnackBar) { }

  ngOnInit() {
  }

  saveReservation(reservation: Reservation, form: NgForm){
      
    var date = new Date();
      var startDate = new Date(reservation.startDate);
      var endDate = new Date(reservation.endDate);
      
      if (date > startDate)
      {
        this.openSnackBar("Start date cant be later then current date","");
        return;
      }
      if (endDate < startDate)
      {
        this.openSnackBar("End date must be later or equal then start date","");
        return;
      }

      reservation.startDate = startDate.toISOString();
      reservation.endDate = endDate.toISOString();

      reservation.price = this.accomodation.autumnPrice;
      reservation.propertyId = this.accomodation.id;
      
      this.httpReservationService.checkReservation(reservation.propertyId, reservation).subscribe(
        (res: any) => { this.reservationFree = res; console.log(this.reservationFree)},
        error => {alert("Unsuccessful fetch operation!"); console.log(error); }
      );

      if(this.reservationFree.reservationFree == true){
        this.httpReservationService.postReservation(reservation).subscribe(
          ()=>{ 
            console.log('RoomRes successfuly posted');
            this.snackBar.open("Reservation successfuly posted", "", { duration: 2500,});            
          },
          error => {alert("Close!"); console.log(error);}
      );
      }
      else{
        this.snackBar.open("the selected term is busy.", "", { duration: 2500,});
      }
      
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

}
