import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
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
import {MdSnackBar,MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css'],
  providers: [HttpRoomService]
})
export class RoomEditComponent implements OnInit {

  public eRoom:Room;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  public accomodations:Accommodation;

  constructor(private httpRoomService:HttpRoomService,
              private router: Router,
              private httpAccService: HttpAccommodationService,
              private snackBar:MdSnackBar,
              public dialogRef: MdDialogRef<RoomEditComponent>
              ) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {
    this.httpAccService.getAccommodations().subscribe((res: any) => {
        this.accomodations = res; console.log(this.accomodations);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  editRoom(room: Room, form: NgForm){
      room.Id=this.eRoom.Id;
      room.RoomReservations=this.eRoom.RoomReservations;
      room.Acc_Id=this.eRoom.Acc_Id;
      this.httpRoomService.editRoom(room).subscribe(
          ()=>{ 
            console.log('Room successfuly edited');
            this.snackBar.open("Room successfuly edited", "", { duration: 2500,});
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
