import { Component, OnInit } from '@angular/core';
import {Accommodation} from "../accommodation.model"
import {AccomodationType} from 'app/accomodationtype/accomodationtype.model'
import {Place} from 'app/place/place.model'
import {Http, Headers, Response } from '@angular/http';
import {HttpAccommodationService} from "../accommodation.service"
import {HttpAccomodationTypeService} from "app/accomodationtype/accomodationtype.service"
import {HttpPlaceService} from "app/place/place.service"
import {Observable } from "rxjs/Observable";
import {FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef,MdDialogConfig} from '@angular/material';
import{MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"


@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.css'],
  providers: [HttpAccommodationService,HttpAccomodationTypeService]
})
export class AccommodationAddComponent implements OnInit {
 
  nAccommodation:any={};
  public accommodationTypes: Array<AccomodationType>;
  public places:Array<Place>;
  private postAccommodation:Accommodation;
  mapInfo:MapModel;

  constructor(private httpAccommodationService:HttpAccommodationService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              private router: Router,
              private httpPlaceService:HttpPlaceService,
              public dialogRef: MdDialogRef<AccommodationAddComponent>,
              public dialog:MdDialog) { }

  ngOnInit() {
    this.httpAccommodationTypeService.getAccomodationTypes().subscribe((res: any) => {
        this.accommodationTypes = res; console.log(this.accommodationTypes);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
      this.httpPlaceService.getPlaces().subscribe((res: any) => {
        this.places = res; console.log(this.places);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
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
            console.log("Successfuly checked coordinates.");
            if (res == undefined) {
                return;
            }
            this.nAccommodation.Latitude = res.latitude;
            this.nAccommodation.Longitude = res.longitude;
        });
  }

  saveAccommodation(accommodation: Accommodation, form: NgForm){
       this.postAccommodation=new Accommodation();
       this.postAccommodation.Name=accommodation.Name;
       this.postAccommodation.AccommodationType_Id=accommodation.AccommodationType_Id;
       this.postAccommodation.Address=accommodation.Address;
       this.postAccommodation.Description=accommodation.Description;
       this.postAccommodation.ImageURL=accommodation.ImageURL;
       this.postAccommodation.Latitude=accommodation.Latitude;
       this.postAccommodation.Longitude=accommodation.Longitude;
       this.postAccommodation.Place_Id=accommodation.Place_Id;
       this.postAccommodation.AppUser_Id=1;   /*TODO User from local*/

       this.httpAccommodationService.postAccommodation(this.postAccommodation).subscribe(
          ()=>{ 
            console.log('Accommodation successfuly posted');
            this.router.navigate(['/accomodation']);
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }

}
