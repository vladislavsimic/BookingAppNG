import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
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
  selector: 'app-room-reservation-edit',
  templateUrl: './room-reservation-edit.component.html',
  styleUrls: ['./room-reservation-edit.component.css'],
 providers: [HttpRoomReservationService]
})
export class RoomReservationEditComponent implements OnInit {

  @Input() eRoomReservation:RoomReservation;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpRoomResService:HttpRoomReservationService,private router: Router) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {
  }

  editRoom(roomRes: RoomReservation, form: NgForm){
    
      this.httpRoomResService.editRoomReservation(roomRes).subscribe(
          ()=>{ 
            console.log('RoomRes successfuly edited');
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
