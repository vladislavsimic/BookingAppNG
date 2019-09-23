import { Component,OnInit,Input } from '@angular/core';
import { HttpAuthenticationService } from 'app/login/userAuthentication.service';
import { Http, Headers, Response } from '@angular/http';
import { MdDialog,MdSnackBar } from '@angular/material';
import {LoginComponent} from "app/login/login.component"
import {RegisterComponent} from "app/register/register.component"
import {Router, ActivatedRoute} from '@angular/router';
import {AppUrl} from "app/appservice/AppUrl.services"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpAuthenticationService]

})
export class AppComponent {

  username: string;
  isLoggedIn:boolean;
  private role:string;
  private adminRole:boolean;
  private managerRole:boolean;
  private appUser:boolean;
  public static adminR:boolean;
  public static managerR: boolean;

  constructor(private httpAuthService:HttpAuthenticationService,public dialog: MdDialog,private router:Router,
             public snackBar: MdSnackBar,
              private appUrl:AppUrl){
     }

  ngOnInit(){
      this.adminRole=false;
      this.appUser=false;
      this.managerRole=false;
      this.createPermision();
      this.checkForUser();
  }

  createPermision(){
      this.role=localStorage.getItem('role');
      if(this.role=="ADMIN"){
          this.adminRole=true;
          AppComponent.adminR = true;
      }else if(this.role=="USER"){
          this.appUser=true;
      }else if(this.role=="AGENT"){
          this.managerRole=true;
          AppComponent.managerR = true;
      }
  }

  openLoginDialog() {

        let dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == undefined){
                return;
            }
            location.reload();
        },
            error => { alert("Close!"); console.log(error); }
        );
    }

    openRegistrationDialog() {
        let dialogRef = this.dialog.open(RegisterComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == undefined)
                return;

            if (result == "success") {
                this.ngOnInit();            
            }
        },
            error => { alert("Close!"); console.log(error); }
        );
    }

  checkForUser(){
      this.role=localStorage.getItem('role');
      if(this.role==null || this.role==undefined){
          this.isLoggedIn=false;
          return;
      }
      this.isLoggedIn=true;
  }

  logout(){
    //   this.httpAuthService.logout().subscribe(
    //       response=>{
        localStorage.clear();
        AppComponent.adminR = false;
        AppComponent.managerR = false;
        this.ngOnInit();
        this.router.navigate(['/home']);
    //       },
    //       error=>{console.log(error); alert("Logout failed!");}
    //   );
  }

    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  routeForLink = [
        {
            route:['/home'],
            label: "Home"

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
        },
        {
          route: ['/managers'],
          label: "Managers"
        }
    ]
     
}
