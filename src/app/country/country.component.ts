import { Component, OnInit } from '@angular/core';
import {Country} from "./country.model"
import { Http, Response } from '@angular/http';
import {HttpCountryService} from "./country.service"
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [HttpCountryService]
})
export class CountryComponent implements OnInit {
  
  private countries:Array<Country>;
  private countryObj:Country;

  constructor(private httpCountryService:HttpCountryService) {
  }

  ngOnInit() {
    this.httpCountryService.getCountries().subscribe(
      (res: any) => {this.countries = res; console.log(this.countries)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    
  }

  deleteCountry(country:Country){
    
    alert("usao u deleteCountry");
    
    this.httpCountryService.deleteCountry(country).subscribe(
      ()=>{
      console.log('Country ' + country.Name + ' successfuly deleted');
      },
      error=>{alert("Country ' + country.Name + ' failed delete!"); console.log(error);}
    );
  }
}
