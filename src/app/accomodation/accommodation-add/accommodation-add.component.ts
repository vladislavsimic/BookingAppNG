import { Component, OnInit } from '@angular/core';
import {Accommodation, Address} from "../accommodation.model"
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
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import{MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"
import {ImageuploadComponent} from "app/imageupload/imageupload.component"
import {Manager} from "app/managers/manager.model"
import * as jwt_decode from "jwt-decode";
import { AccomodationServices } from 'app/accomodation-services/accomodation-service.model';
import { HttpAccomodationServicesService } from 'app/accomodation-services/accomodation-service.service';

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.css'],
  providers: [HttpAccommodationService,HttpAccomodationTypeService]
})
export class AccommodationAddComponent implements OnInit {
 
  nAccommodation:any={};
  private managerId : string;
  public accommodationTypes: Array<AccomodationType>;
  public accommodationServices: Array<AccomodationServices>;
  public places:Array<Place>;
  private postAccommodation:Accommodation;
  mapInfo:MapModel;

  constructor(private httpAccommodationService:HttpAccommodationService,
              private httpAccommodationTypeService:HttpAccomodationTypeService,
              private httpAccommodationServicesService:HttpAccomodationServicesService,
              private router: Router,
              private httpPlaceService:HttpPlaceService,
              public dialogRef: MdDialogRef<AccommodationAddComponent>,
              public dialog:MdDialog,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
    // this.accommodationTypes = [
    //    {Id:1, name:"acc type 1"},
    //    {Id:2, name:"acc type 2"},
    //   ];
    var decodedToken = jwt_decode(localStorage.getItem("id_token"));
    this.managerId = decodedToken.sub;

    this.httpAccommodationTypeService.getAccomodationTypes().subscribe((res: any) => {
        this.accommodationTypes = res; console.log(this.accommodationTypes);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );

      this.httpAccommodationServicesService.getServices().subscribe((res: any) => {
        this.accommodationServices = res; console.log(this.accommodationServices);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  openChooseImagesDialog(){
    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(ImageuploadComponent,config);
    dialogRef.componentInstance.accommodation=this.nAccommodation;
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
            this.nAccommodation.latitude = res.latitude;
            this.nAccommodation.longitude = res.longitude;
        });
  }

  saveAccommodation(accommodation: any, form: NgForm){
    
      console.log(this.accommodationServices);

       this.postAccommodation=new Accommodation();
       this.postAccommodation.address = new Address();

       this.postAccommodation.name = accommodation.name;
       this.postAccommodation.description = accommodation.description;
       this.postAccommodation.price = accommodation.price;
       this.postAccommodation.stars = accommodation.stars;
       this.postAccommodation.numberOfCancellationDays = accommodation.numberOfCancellationDays;
       this.postAccommodation.numberOfPeople = accommodation.numberOfPeople;
       this.postAccommodation.address.city = accommodation.city;
       this.postAccommodation.address.country = accommodation.country;
       this.postAccommodation.address.latitude = accommodation.latitude;
       this.postAccommodation.address.longitude = accommodation.longitude;
       this.postAccommodation.address.street = accommodation.street;
       this.postAccommodation.typeId = accommodation.accomodationTypeId;
       this.postAccommodation.imageUrls = [];
       this.postAccommodation.agentId = this.managerId;
       this.postAccommodation.services = new Array<string>();
       this.accommodationServices.forEach(element => {
         if(element.checked!=undefined && element.checked==true){
           this.postAccommodation.services.push(element.id);
         }
       });
       //this.postAccommodation.services = ["3e1e1578-b5db-4d8f-832d-58b826d4aa5d", "6b88bdf2-5c46-4b6f-bf50-4cb281fb2ebd","11cd4713-521a-442a-9a32-b68bb871ad65"];

       this.httpAccommodationService.postAccommodation(this.postAccommodation).subscribe(
          ()=>{ 
            console.log('Accommodation successfuly posted');
            this.snackBar.open("Accommodation successfuly posted.", "", { duration: 2500,});
            this.router.navigate(['/accomodation']);
            this.dialogRef.close();
          },
          error => {alert("Close!"); console.log(error);
          }
        );
       
  }

}
