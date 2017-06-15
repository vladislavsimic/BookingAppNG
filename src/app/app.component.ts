import { Component,OnInit } from '@angular/core';
import { HttpAuthenticationService } from 'app/login/userAuthentication.service';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpAuthenticationService]

})
export class AppComponent {
  title = 'app';

  username: string;
  isLoggedIn:boolean;
  private loginFlag;

  constructor(private httpAuthService:HttpAuthenticationService){
  }

  ngOnInit():void{
      this.loginFlag=false;
      this.checkForUser();
  }

  checkForUser(){
      this.username=localStorage.getItem('username');
      if(this.username==null || this.username==undefined){
          this.isLoggedIn=false;
          return;
      }
      this.isLoggedIn=true;
  }

  loginClick(){
      this.ngOnInit();
      this.loginFlag=true;
  }

  getNotification(evt) {
      this.loginFlag=false;
      this.ngOnInit();
  }

  logout(){
      this.httpAuthService.logout().subscribe(
          response=>{
              localStorage.clear();
              this.checkForUser();
          },
          error=>{console.log(error); alert("Logout failed!");}
      );
  }

  routeForLink = [
        {
            route: ['/country'],
            label: "Country"
        },
        {
            route: ['/region'],
            label: "Region"
        },
        {
            route: ['/place'],
            label: "Place"
        },
        {
            route: ['/accomodation'],
            label: "Accomodation"
        },
        {
            route: ['/accomodation-type'],
            label: "Accomodation Type"
        },
        {
          route: ['/comment'],
          label: "Comment"
        },
        {
          route: ['/room'],
          label: "Room"
        },
        {
          route: ['/room-reservation'],
          label: "RoomReservation"
        }
    ]
}
