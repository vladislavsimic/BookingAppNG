import { Component, OnInit,Input } from '@angular/core';
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

  constructor(private httpCountryService:HttpCountryService) {
  }

  nCountry:any={};
  @Input() eCountry:Country;

  ngOnInit() {
    console.log("dadsa"+this.eCountry);
  }

  saveCountry(country: Country, form: NgForm){
      
      alert("Usao u saveCountry");
      
       this.httpCountryService.postCountry(country).subscribe(
          ()=>{ 
            console.log('Country successfuly posted');
          },
          error => {alert("Close!"); console.log(error);}
        );

  }
}
