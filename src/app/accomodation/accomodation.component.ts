import { Component, OnInit } from '@angular/core';
import {Accommodation} from "./accommodation.model"
import {Region} from "../region/region.model"
import { Http, Response } from '@angular/http';
import {HttpAccommodationService} from "./accommodation.service"
import { Observable } from "rxjs/Observable";
import {MdDialog, MdDialogRef,MdDialogConfig,MdSnackBar} from '@angular/material';
import{MapModel} from "app/map/map.model";
import {MapComponent} from "app/map/map.component"
import {SearchComponent} from "app/search/search.component";
import {Manager} from "app/managers/manager.model"
import {HttpUsersService} from "app/managers/users.service"
import {RoomAddComponent} from "app/room/room-add/room-add.component"
import {AccommodationAddComponent} from "app/accomodation/accommodation-add/accommodation-add.component"
import {AccommodationEditComponent} from "app/accomodation/accommodation-edit/accommodation-edit.component";
import { AccomodationDetailsComponent} from "app/accomodation/accomodation-details/accomodation-details.component";
import * as jwt_decode from "jwt-decode";
import {Router, ActivatedRoute} from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css'],
  providers:[HttpAccommodationService]
})
export class AccomodationComponent implements OnInit {

  private accommodations:Array<Accommodation>;
  private originalAccomodations:Array<Accommodation>;
  accommodation:Accommodation;
  private editFlag;
  filtredAcc: Array<Accommodation>;
  mapInfo:MapModel;
  public imageUrl:string;
  public count : number;
  private userUndefined:boolean;
  private adminRole:boolean;
  private managerRole:boolean;
  private managerActive:boolean;
  private userManagerId:string;
  private appUser:boolean;
  private role:string;
  private accName:string;
  private stars:number[] = [1,2,3,4,5];
  private selectedStarValue:any;
  breakpoint: number = 3;  //to adjust to screen

  constructor(private httpAccommodationService:HttpAccommodationService,
              public dialog:MdDialog,
              private httpUsersService:HttpUsersService,
              private snackBar:MdSnackBar,
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    this.editFlag = false;
    this.adminRole = false;
    this.managerRole = false;
    this.appUser = false;
    this.userUndefined = true;
    this.managerActive = false;
    this.createPermisions();

    this.initializeAccomodations();
  }

  onResize(event) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  locationClick(acc:Accommodation){
    let config = new MdDialogConfig();
    config.height='680px';
    config.width='670px';

    this.mapInfo = new MapModel(acc.address.latitude, acc.address.longitude, 
    "",
    "" , "" , "");

    let dialogRef = this.dialog.open(MapComponent,config);
    dialogRef.componentInstance.watching=true;
    dialogRef.componentInstance.adding=false;
    dialogRef.componentInstance.mapInfo = this.mapInfo;
    dialogRef.componentInstance.accomodation=acc;
  }

  initializeAccomodations(){
    if(this.managerRole==true){
      this.httpAccommodationService.getManagerAccommodations(this.userManagerId).subscribe(
        (res: any) => {
          this.accommodations = res;
          this.originalAccomodations = res; 
          console.log(this.accommodations);
          console.log(this.originalAccomodations);
        },
          // this.setImagesForAccommodations();},
          error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }
    else{
      this.httpAccommodationService.getAccommodations().subscribe(
        (res: any) => {
          this.accommodations = res;
          this.originalAccomodations = res; 
          console.log(this.accommodations);
          console.log(this.originalAccomodations);
        },
          // this.setImagesForAccommodations();},
          error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }
  }

  createPermisions(){
      this.role=localStorage.getItem('role');
      if(this.role == "ADMIN"){
          this.adminRole = true;
          this.userUndefined = false;
      }else if(this.role == "USER"){
          this.appUser=true;
          this.userUndefined = false;
      }else if(this.role == "AGENT"){
          this.managerRole = true;
          this.userUndefined = false;
          this.managerActive = true;
          var decodedToken = jwt_decode(localStorage.getItem("id_token"));
          this.userManagerId = decodedToken.sub;
          // this.setUserManager();
      }
  }

  searchAccomodations(place:string){
    this.filtredAcc = new Array<Accommodation>();
    
    if((this.accName != undefined) || (this.selectedStarValue != undefined)){
      for (let accomodation of this.originalAccomodations) {
        console.log(accomodation.address.city);

        if(this.accName != undefined && this.selectedStarValue != undefined){
          if(accomodation.address.city.toLowerCase() == place.toLowerCase() && accomodation.stars == this.selectedStarValue){
              this.filtredAcc.push(accomodation);
          }
          continue;
        }

        if(this.accName != undefined && accomodation.address.city.toLowerCase() == place.toLowerCase()){
          this.filtredAcc.push(accomodation);
        }
        else if(this.selectedStarValue != undefined && accomodation.stars == this.selectedStarValue){
          this.filtredAcc.push(accomodation);
        }
      }
      this.accommodations = this.filtredAcc;
    }
    
  }

  resetSearchAccomodations(){
    this.accName=undefined;
    this.selectedStarValue = undefined;
    this.initializeAccomodations();
  }

  // setUserManager(){
  //   this.httpUsersService.getUser().subscribe(
  //     (res: any) => {
  //       this.userManager = res;
  //       if(this.userManager.isActive != undefined){
  //           this.managerActive = this.userManager.isActive;
  //         }
  //       console.log(this.userManager);},
  //       error => {alert("Unsuccessful fetch operation!"); console.log(error);}
  //   );
  // }

  getNotification(evt) {
      this.ngOnInit();
  }

  editClick(accommodation:Accommodation){
    this.editFlag=true;
    this.accommodation=accommodation;
  }

  delete(accommodation:Accommodation){

    this.httpAccommodationService.deleteAccommodation(accommodation.id).subscribe(
      ()=>{
        console.log('Accommodation ' + accommodation.name + ' successfuly deleted');
        this.snackBar.open("Accommodation " + accommodation.name + " successfuly deleted", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{alert("Accommodation ' + accommodation.Name + ' failed delete!"); console.log(error);}
    );
  }

  openAccNewDialog(){

    let config = new MdDialogConfig();
    config.height='700px';
    config.width='700px';

    let dialogRef = this.dialog.open(AccommodationAddComponent, config);
    // dialogRef.componentInstance.userManager=this.userManager;

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  
  editAccNewDialog(acc:Accommodation){
      let config = new MdDialogConfig();
      config.data = acc;
      config.height='700px';
      config.width='700px';

      let dialogRef = this.dialog.open(AccommodationEditComponent,config);
      dialogRef.componentInstance.eAccommodation = acc;
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

  // addRoomDialog(accommodation:Accommodation){
      
  //     let dialogRef = this.dialog.open(RoomAddComponent);
  //     dialogRef.componentInstance.accommodation=accommodation;

  //     dialogRef.afterClosed().subscribe(result => {
  //       this.ngOnInit();
  //   });
  // }


  detailsDialog(acc:Accommodation){
    // let config = new MdDialogConfig();
    // config.data = acc;
    // config.height = '700px';
    // config.width = '850px';
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
          accId: acc.id,
      }
    }
    this.router.navigate(['accomodation-view'], navigationExtras);
  //   let dialogRef = this.dialog.open(AccomodationDetailsComponent,config);
  //   dialogRef.componentInstance.detAccomodation = acc;
    
  //   dialogRef.afterClosed().subscribe(result => {
     
  //    if (result != null)
  //    {
  //     this.ngOnInit();
  //    }
  // });
 }

 reservationsDialog(acc:Accommodation){
    let config = new MdDialogConfig();
    config.data = acc;
    config.height = '700px';
    config.width = '850px';
 }

 openSearchDialog(){
   let config = new MdDialogConfig();
    config.height = '500px';
    config.width = '450px'; 
    let dialogRef = this.dialog.open(SearchComponent,config);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result != null)
      {
        this.accommodations = result;
      }
  });

 }
}


 



