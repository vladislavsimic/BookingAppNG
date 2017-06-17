import { Component, OnInit } from '@angular/core';
import {Accommodation} from "./accommodation.model"
import {Region} from "../region/region.model"
import { Http, Response } from '@angular/http';
import {HttpAccommodationService} from "./accommodation.service"
import { Observable } from "rxjs/Observable";
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import {AccommodationAddComponent} from "app/accomodation/accommodation-add/accommodation-add.component";
import {AccommodationEditComponent} from "app/accomodation/accommodation-edit/accommodation-edit.component";
import { AccomodationDetailsComponent} from "app/accomodation/accomodation-details/accomodation-details.component";
import {AccomodationCommentComponent} from "app/accomodation/accomodation-comment/accomodation-comment.component"


@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css'],
  providers:[HttpAccommodationService]
})
export class AccomodationComponent implements OnInit {

  private accommodations:Array<Accommodation>;
  private editFlag;
  accommodation:Accommodation;
  selectedOption: string;
  private adminRole:boolean;
  private managerRole:boolean;
  private appUser:boolean;
  private role:string;
  
  constructor(private httpAccommodationService:HttpAccommodationService,public dialog:MdDialog) { }


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
  openAccNewDialog(){
    let dialogRef = this.dialog.open(AccommodationAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      this.ngOnInit();
    });
  }
    editAccNewDialog(acc:Accommodation){
      let config = new MdDialogConfig();
      config.data = acc;
    let dialogRef = this.dialog.open(AccommodationEditComponent,config);
    dialogRef.componentInstance.eAccommodation = acc;
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      this.ngOnInit();
    });

  }


  detailsDialog(acc:Accommodation){
    let config = new MdDialogConfig();
    config.data = acc;
    config.height = '700px';
    config.width = '850px';
    let dialogRef = this.dialog.open(AccomodationDetailsComponent,config);
    dialogRef.componentInstance.detAccomodation = acc;
    
    dialogRef.afterClosed().subscribe(result => {
    this.selectedOption = result;
    this.ngOnInit();
  });
 }

 commentDialog(acc:Accommodation){
    let config = new MdDialogConfig();
    config.data = acc;
    config.height = '700px';
    config.width = '850px';
    let dialogRef = this.dialog.open(AccomodationCommentComponent,config);
    dialogRef.componentInstance.commentAccomodation = acc;
    
    dialogRef.afterClosed().subscribe(result => {
    this.selectedOption = result;
    this.ngOnInit();
  });
 }

}


 



