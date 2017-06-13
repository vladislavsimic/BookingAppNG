import { Component, OnInit,Input } from '@angular/core';
import {RoomReservation} from "../roomreservation.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpRoomReservationService} from "../roomreservation.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

@Component({
  selector: 'app-room-reservation-add',
  templateUrl: './room-reservation-add.component.html',
  styleUrls: ['./room-reservation-add.component.css'],
  providers: [HttpRoomReservationService]
})
export class RoomReservationAddComponent implements OnInit {

 nRoomReservation:any={};

  constructor(private httpRoomResService:HttpRoomReservationService,private router: Router) {
  }

  ngOnInit() {
  }

  saveRoomReservation(roomRes: RoomReservation, form: NgForm){
            
       this.httpRoomResService.postRoomReservations(roomRes).subscribe(
          ()=>{ 
            console.log('RoomRes successfuly posted');
            this.router.navigate(['/room-reservation']);
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
}
