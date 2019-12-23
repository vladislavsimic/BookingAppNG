import { Component, OnInit } from '@angular/core';
import {Reservation} from "./reservation.model"
import {HttpReservationService} from "./reservation.service"
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private reservations:Array<Reservation>;

  constructor(private httpReservationService:HttpReservationService,
    private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.httpReservationService.getReservations().subscribe(
      (res: any) => {this.reservations = res; console.log(this.reservations)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

}
