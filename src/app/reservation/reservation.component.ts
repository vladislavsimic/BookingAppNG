import { Component, OnInit } from '@angular/core';
import {Reservation} from "./reservation.model"
import {HttpReservationService} from "./reservation.service"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import { RatingComponent } from 'app/rating/rating.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private reservations : Array<Reservation>;
  private accomodationId : string;

  constructor(private httpReservationService:HttpReservationService,
              private snackBar:MdSnackBar,
              private route: ActivatedRoute,
              public dialog:MdDialog) 
              {
                this.route.queryParams.subscribe(params => {
                this.accomodationId = params["accId"];
                console.log(this.accomodationId);
                console.log(params);
                });
     }

  ngOnInit() {
    this.httpReservationService.getPropertyReservations(this.accomodationId).subscribe(
      (res: any) => {this.reservations = res; console.log(this.reservations)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addRating(reservation:Reservation){
      let config = new MdDialogConfig();
      config.height='700px';
      config.width='700px';

      let dialogRef = this.dialog.open(RatingComponent,config);
      dialogRef.componentInstance.reservationId = reservation.id;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
