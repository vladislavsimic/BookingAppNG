import { Component, OnInit } from '@angular/core';
import {User, Agent} from "./user.model"
import { Http, Response } from '@angular/http';
import {HttpRegisterService} from "./register.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import { MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {MdSnackBar} from "@angular/material";
import{MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"
import { Address } from 'app/accomodation/accommodation.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[HttpRegisterService]
})
export class RegisterComponent implements OnInit {

  nUser:any={};
  private postUser:User;
  private postAgent:any={};
  public addManager : boolean;
  mapInfo:MapModel;

  constructor(private httpRegisterService:HttpRegisterService,
              public dialogRef: MdDialogRef<RegisterComponent>,
              private snackBar:MdSnackBar,
              public dialog:MdDialog) { }

  ngOnInit() {
  }

  registerUser(user: any, form: NgForm) {

    this.postUser = new User();
    this.postUser.email = this.nUser.email;
    this.postUser.firstName = this.nUser.firstName;
    this.postUser.lastName = this.nUser.lastName;
    this.postUser.username = this.nUser.username;
    this.postUser.password = this.nUser.password;

    if(this.addManager==true){
      this.postAgent = new Agent();
      this.postAgent.pib = this.nUser.pib;
      this.postAgent.email = this.postUser.email;
      this.postAgent.firstName = this.postUser.firstName;
      this.postAgent.lastName = this.postUser.lastName;
      this.postAgent.username = this.postUser.username;
      this.postAgent.password = this.postUser.password;
      this.postAgent.address = new Address();
      this.postAgent.address.city = this.nUser.city;
      this.postAgent.address.country = this.nUser.country;
      this.postAgent.address.latitude = this.nUser.latitude;
      this.postAgent.address.longitude = this.nUser.longitude;
      this.postAgent.address.street = this.nUser.street;

      this.httpRegisterService.registerManager(this.postAgent).subscribe(
        data => {
          console.log('User successfuly registered');
          this.snackBar.open("User successfuly registered", "", { duration: 2500,});
          this.dialogRef.close("success");
        },
        error => { alert(error); console.log(error); })
    }
    else{
      this.httpRegisterService.registerUser(this.postUser).subscribe(
        data => {
          console.log('User successfuly registered');
          this.snackBar.open("User successfuly registered", "", { duration: 2500,});
          this.dialogRef.close("success");
        },
        error => { alert(error); console.log(error); })
    }
    }

    openMapAdd(){
      let config = new MdDialogConfig();
      config.height='700px';
      config.width='700px';
  
      this.mapInfo = new MapModel(45.242268, 19.842954, 
      "",
      "" , "" , "");
  
      let dialogRef = this.dialog.open(MapComponent);
      dialogRef.componentInstance.mapInfo = this.mapInfo;
      dialogRef.componentInstance.adding=true;
      dialogRef.componentInstance.watching=false;
  
      dialogRef.afterClosed().subscribe((res) => {
              console.log("Successfuly checked coordinates.")
              this.snackBar.open("Successfuly checked coordinates.", "", { duration: 2500,});
              if (res == undefined) {
                  return;
              }
              this.nUser.latitude = res.latitude;
              this.nUser.longitude = res.longitude;
          });
    }
    

}
