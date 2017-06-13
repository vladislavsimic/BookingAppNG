import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Room} from "../room.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpRoomService} from "../room.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css'],
  providers: [HttpRoomService]
})
export class RoomEditComponent implements OnInit {

  @Input() eRoom:Room;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpRoomService:HttpRoomService,private router: Router) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {
  }

  editRoom(room: Room, form: NgForm){
    
      this.httpRoomService.editRoom(room).subscribe(
          ()=>{ 
            console.log('Room successfuly edited');
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
