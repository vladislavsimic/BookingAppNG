import { Component, OnInit,Input } from '@angular/core';
import {Room} from "../room.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpRoomService} from "../room.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {Accommodation} from "app/accomodation/accommodation.model";
import {HttpAccommodationService} from "app/accomodation/accommodation.service";

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css'],
  providers: [HttpRoomService]
})
export class RoomAddComponent implements OnInit {

  nRoom:any={};
  public accommodation:Accommodation;

  constructor(private httpRoomService:HttpRoomService,private router: Router,
  private httpAccService: HttpAccommodationService) {
  }

  ngOnInit() {
  }

  saveRoom(room: Room, form: NgForm){
      
      room.Acc_Id=this.accommodation.Id;

      this.httpRoomService.postRoom(room).subscribe(
          ()=>{ 
            console.log('Room successfuly posted');
            this.ngOnInit();
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
}
