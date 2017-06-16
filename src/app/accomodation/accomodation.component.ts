import { Component, OnInit } from '@angular/core';
import {Accommodation} from "./accommodation.model"
import {Region} from "../region/region.model"
import { Http, Response } from '@angular/http';
import {HttpAccommodationService} from "./accommodation.service"
import { Observable } from "rxjs/Observable";
import {MdDialog, MdDialogRef} from '@angular/material';
import {AccommodationAddComponent} from "app/accomodation/accommodation-add/accommodation-add.component";
import {AccommodationEditComponent} from "app/accomodation/accommodation-edit/accommodation-edit.component";



@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css'],
  providers:[HttpAccommodationService]
})
export class AccomodationComponent implements OnInit {

  private accommodations:Array<Accommodation>;
  private editFlag;
  accommodation:any;
  selectedOption: string;
  constructor(private httpAccommodationService:HttpAccommodationService,public dialog:MdDialog) { }

  ngOnInit() {
    this.editFlag=false;
    this.httpAccommodationService.getAccommodations().subscribe(
      (res: any) => {this.accommodations = res; console.log(this.accommodations)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(accommodation:Accommodation){
    this.editFlag=true;
    this.accommodation=accommodation;
  }

  delete(accommodation:Accommodation){

    this.httpAccommodationService.deleteAccommodation(accommodation.Id).subscribe(
      ()=>{
      console.log('Accommodation ' + accommodation.Name + ' successfuly deleted');
      this.ngOnInit();
      },
      error=>{alert("Accommodation ' + accommodation.Name + ' failed delete!"); console.log(error);}
    );
  }
  openAccNewDialog(){
    let dialogRef = this.dialog.open(AccommodationAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      this.ngOnInit();
    });
  }
    editAccNewDialog(acc:Accommodation){
    let dialogRef = this.dialog.open(AccommodationEditComponent,acc);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      this.ngOnInit();
    });

  }


 
}


