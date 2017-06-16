import { Component, OnInit } from '@angular/core';
import {Accommodation} from "./accommodation.model"
import {Region} from "../region/region.model"
import { Http, Response } from '@angular/http';
import {HttpAccommodationService} from "./accommodation.service"
import { Observable } from "rxjs/Observable";

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
  private adminRole:boolean;
  private managerRole:boolean;
  private appUser:boolean;
  private role:string;

  constructor(private httpAccommodationService:HttpAccommodationService) { }

  ngOnInit() {
    this.editFlag=false;
    this.adminRole=false;
    this.managerRole=false;
    this.appUser=false;
    this.createPermisions();
    this.httpAccommodationService.getAccommodations().subscribe(
      (res: any) => {this.accommodations = res; console.log(this.accommodations)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  createPermisions(){
      this.role=localStorage.getItem('role');
      if(this.role=="Admin"){
          this.adminRole=true;
      }else if(this.role=="User"){
          this.appUser=true;
      }else if(this.role=="Manager"){
          this.managerRole=true;
      }

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

}
