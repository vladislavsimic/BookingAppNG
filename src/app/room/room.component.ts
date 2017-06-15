import { Component, OnInit } from '@angular/core';
import {Room} from "./room.model"
import { Http, Response } from '@angular/http';
import {HttpRoomService} from "./room.service"
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [HttpRoomService]
})
export class RoomComponent implements OnInit {
  
  private rooms:Array<Room>;
  private editFlag;
  room:any;

  constructor(private httpRoomService:HttpRoomService) {
  }

  ngOnInit() {
    this.editFlag=false;
    this.httpRoomService.getRooms().subscribe(
      (res: any) => {this.rooms = res; console.log(this.rooms)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(room:Room){
    this.editFlag=true;
    this.room=room;
  }

  delete(room:Room){

    this.httpRoomService.deleteRoom(room.Id).subscribe(
      ()=>{
      console.log('Room ' + room.Id + ' successfuly deleted');
      this.ngOnInit();
      },
      error=>{alert("Room ' + room.ID + ' failed delete!"); console.log(error);}
    );
  }
}
