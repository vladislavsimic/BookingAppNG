import { Component, OnInit,Input } from '@angular/core';
import {RoomReservation} from "../roomreservation.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpRoomReservationService} from "../roomreservation.service"
import {HttpRoomService} from "app/room/room.service";
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {Room} from "app/room/room.model";

@Component({
  selector: 'app-room-reservation-add',
  templateUrl: './room-reservation-add.component.html',
  styleUrls: ['./room-reservation-add.component.css'],
  providers: [HttpRoomReservationService,HttpRoomService]
})
export class RoomReservationAddComponent implements OnInit {

 nRoomReservation:any={};
 public rooms : Array<Room>;
  constructor(private httpRoomResService:HttpRoomReservationService,private httpRoomService : HttpRoomService,private router: Router) {
  }

  ngOnInit() {
     this.httpRoomService.getRooms().subscribe((res: any) => {
        this.rooms = res; console.log(this.rooms);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
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
