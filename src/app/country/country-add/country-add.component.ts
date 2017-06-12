import { Component, OnInit } from '@angular/core';
import {Country} from "../country.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpCountryService} from "../country.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css'],
  providers: [HttpCountryService]
})
export class CountryAddComponent implements OnInit {

  model: any={};

  constructor(private httpCountryService:HttpCountryService,private appUrl:AppUrl,private http: Http) {
  }

  ngOnInit() {}

  saveCountry(){
      alert("Usao u saveCountry");
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

       this.http.post(this.appUrl+'country', 
       `Name=${this.model.name}
       &Code=${this.model.code}`,
       {headers:headers})
       .subscribe(
        response => {
          alert('Added '+this.model.name+' country.');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );

  }
}
