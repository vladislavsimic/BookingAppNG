import { Component, OnInit } from '@angular/core';
import {AccomodationType} from "./accomodationtype.model"
import { Http, Response } from '@angular/http';
import {HttpAccomodationTypeService} from "./accomodationtype.service"
import {HttpRegionService} from "../region/region.service"
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-accomodationtype',
  templateUrl: './accomodationtype.component.html',
  styleUrls: ['./accomodationtype.component.css'],
  providers: [HttpAccomodationTypeService]
})
export class AccomodationtypeComponent implements OnInit {

  private accomodationTypes:Array<AccomodationType>;
  private editFlag;
  accomodationType:any;

  constructor(private httpAccomodationTypeService:HttpAccomodationTypeService) { }

  ngOnInit() {
    this.editFlag=false;
    this.httpAccomodationTypeService.getAccomodationTypes().subscribe(
      (res: any) => {this.accomodationTypes = res; console.log(this.accomodationTypes)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(accomodationType:AccomodationType){
    this.editFlag=true;
    this.accomodationType=accomodationType;
  }

  delete(accomodationType:AccomodationType){

    this.httpAccomodationTypeService.deleteAccomodationType(accomodationType.Id).subscribe(
      ()=>{
      console.log('AccomodationType ' + accomodationType.Name + ' successfuly deleted');
      this.ngOnInit();
      },
      error=>{alert("AccomodationType ' + accomodationType.Name + ' failed delete!"); console.log(error);}
    );
  }

}