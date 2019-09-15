import { Component, OnInit } from '@angular/core';
import {HttpUsersService} from "./users.service"
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import { MdDialogRef,MdSnackBar } from '@angular/material';
import {Manager} from "./manager.model"

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css'],
  providers:[HttpUsersService]
})
export class ManagersComponent implements OnInit {

  private managers:Array<Manager>;

  constructor(private httpUsersService:HttpUsersService,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    this.httpUsersService.getManagers().subscribe(
      (res: any) => {this.managers = res; console.log(this.managers)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  saveManager(manager:Manager){
    console.log(manager);
    if(manager.isActive==true){
      this.httpUsersService.unblockManager(manager.id).subscribe(
        (res: any) => { 
          console.log("Manager unblocked.");
          this.snackBar.open("Manager unblocked.", "", { duration: 2500,});
        },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }
    else{
      this.httpUsersService.blockManager(manager.id).subscribe(
        (res: any) => { 
          console.log("Manager blocked.");
          this.snackBar.open("Manager blocked.", "", { duration: 2500,});
        },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }
    

  }
}
