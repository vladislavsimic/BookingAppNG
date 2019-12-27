import { Component, OnInit } from '@angular/core';
import {HttpAccomodationServicesService} from "./accomodation-service.service"
import {AccomodationServices} from "./accomodation-service.model"
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-accomodation-services',
  templateUrl: './accomodation-services.component.html',
  styleUrls: ['./accomodation-services.component.css'],
  providers: [HttpAccomodationServicesService]
})
export class AccomodationServicesComponent implements OnInit {

  private services: Array<AccomodationServices>;
  private adminRole:boolean;
  private role:string;
  private editFlag;
  accomodationServices:any;

  constructor(private httpAccomodationServicesService:HttpAccomodationServicesService,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.adminRole=false;
    this.editFlag=false;
    this.createPermisions();
    this.httpAccomodationServicesService.getServices().subscribe(
      (res: any) => { this.services = res; console.log(this.services)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error); }
    );
  }

  createPermisions(){
    this.role=localStorage.getItem('role');
      if(this.role=="ADMIN"){
          this.adminRole=true;
      }
  }

  editClick(accomodationServices:AccomodationServices){
    this.editFlag=true;
    this.accomodationServices = accomodationServices;
  }

  getNotification(evt) {
    this.ngOnInit();
}

}
