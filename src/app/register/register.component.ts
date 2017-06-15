import { Component, OnInit } from '@angular/core';
import {User} from "./user.model"
import { Http, Response } from '@angular/http';
import {HttpRegisterService} from "./register.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[HttpRegisterService]
})
export class RegisterComponent implements OnInit {

  nUser:any={};

  constructor(private httpRegisterService:HttpRegisterService,private router:Router) { }

  ngOnInit() {
  }

  registerUser(user: User, form: NgForm) {

    this.httpRegisterService.registerUser(user).subscribe(
      data => {
        console.log('User successfuly registered');
        alert("User registered.");
      },
      error => { alert(error); console.log(error); })
  }

}
