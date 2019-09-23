import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Accommodation} from "../accommodation.model"
import {Address} from "../accommodation.model"
import {AccomodationType} from "app/accomodationtype/accomodationtype.model"
import {Place} from 'app/place/place.model'
import { Http, Headers, Response } from '@angular/http';
import {HttpPlaceService} from 'app/place/place.service'
import {HttpAccommodationService} from 'app/accomodation/accommodation.service'
import {HttpAccomodationTypeService} from 'app/accomodationtype/accomodationtype.service'
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig,MdSnackBar} from '@angular/material';
import{MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"
import {AppComponent} from "app/app.component";
import {ImageuploadComponent} from "app/imageupload/imageupload.component"

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css'],
  providers:[HttpPlaceService,HttpAccommodationService,HttpAccomodationTypeService]
})
export class AccommodationEditComponent implements OnInit {

  private accommodationForEdit:Accommodation;
  public places: Array<Place>;
  public accommodationTypes:Array<AccomodationType>;
  public eAccommodation : Accommodation;
  mapInfo:MapModel;

  constructor(private httpPlaceService:HttpPlaceService,
              private httpAccommodationService:HttpAccommodationService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              public dialogRef: MdDialogRef<AccommodationEditComponent>,
              private router:Router,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) {
               
               }

  ngOnInit() {

    this.httpAccommodationTypeService.getAccomodationTypes().subscribe((res: any) => {
        this.accommodationTypes = res; console.log(this.accommodationTypes);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );      
  }

  openChangeImageDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.accommodation=this.eAccommodation;
  }

  openMapChangeLocation(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    this.mapInfo = new MapModel(this.eAccommodation.address.latitude,this.eAccommodation.address.longitude, 
    "",
    "" , "" , "");

    let dialogRef = this.dialog.open(MapComponent);
    dialogRef.componentInstance.mapInfo = this.mapInfo;
    dialogRef.componentInstance.adding=true;
    dialogRef.componentInstance.watching=false;

    dialogRef.afterClosed().subscribe((res) => {
            console.log("Successfully checked coordinates.");
            this.snackBar.open("Successfully checked coordinates.", "", { duration: 2500,});

            if (res == undefined) {
                return;
            }
            this.eAccommodation.address.latitude = res.latitude;
            this.eAccommodation.address.longitude = res.longitude;
        });
  }

  editAccommodation(accommodation: any, form: NgForm){
    
      this.accommodationForEdit=new Accommodation();
      this.accommodationForEdit.address = new Address();
      this.accommodationForEdit.type = new AccomodationType();

      this.accommodationForEdit.Id=this.eAccommodation.Id;

      this.accommodationForEdit.name = accommodation.name;
      this.accommodationForEdit.description = accommodation.description;
      this.accommodationForEdit.autumnPrice = accommodation.autumnPrice;
      this.accommodationForEdit.springPrice = accommodation.springPrice;
      this.accommodationForEdit.winterPrice = accommodation.winterPrice;
      this.accommodationForEdit.summerPrice = accommodation.summerPrice;
      this.accommodationForEdit.stars = accommodation.stars;
      this.accommodationForEdit.numberOfCancellationDays = accommodation.numberOfCancellationDays;
      this.accommodationForEdit.numberOfPeople = accommodation.numberOfPeople;
      this.accommodationForEdit.address.city = accommodation.city;
      this.accommodationForEdit.address.country = accommodation.country;
      this.accommodationForEdit.address.latitude = accommodation.latitude;
      this.accommodationForEdit.address.longitude = accommodation.longitude;
      this.accommodationForEdit.address.street = accommodation.street;
      this.accommodationForEdit.type.Id = accommodation.accomodationTypeId;
      this.accommodationForEdit.imageUrls = accommodation.imageUrls;

      
      this.httpAccommodationService.editAccommodation(this.accommodationForEdit).subscribe(
        ()=>{ 
          console.log('Accommodation successfully edited');
          this.snackBar.open("Accommodation successfully edited", "", { duration: 2500,});
          this.dialogRef.close();
        },
        error => {alert("Close!"); console.log(error);}
      );
  }
}
