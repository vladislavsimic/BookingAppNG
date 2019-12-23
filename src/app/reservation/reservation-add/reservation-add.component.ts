import { Component, OnInit } from '@angular/core';
import {Reservation} from "../reservation.model"
import {HttpReservationService} from "../reservation.service"
import {MdSnackBar} from "@angular/material";
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css'],
  providers: [HttpReservationService]
})
export class ReservationAddComponent implements OnInit {

  public nReservation: any={};

  constructor(private httpReservationService:HttpReservationService,
    private snackBar:MdSnackBar) { }

  ngOnInit() {
  }

  saveRoomReservation(reservation: Reservation, form: NgForm){
      
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

      
       this.httpReservationService.postReservation(reservation).subscribe(
          ()=>{ 
            console.log('RoomRes successfuly posted');
            this.snackBar.open("Reservation successfuly posted", "", { duration: 2500,});            
          },
          error => {alert("Close!"); console.log(error);}
        );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

}
