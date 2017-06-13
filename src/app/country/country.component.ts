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
  editFlag=false;
  country:any;

  constructor(private httpCountryService:HttpCountryService) {
  }

  ngOnInit() {
    this.httpCountryService.getCountries().subscribe(
      (res: any) => {this.countries = res; console.log(this.countries)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    
  }

  editClick(country:Country){
    alert("usao u ediclick")
    this.editFlag=true;
    this.country=country;
    console.log(country);
  }

  edit(country:Country){
    alert("bla bla");
  }

  delete(country:Country){

    this.httpCountryService.deleteCountry(country.Id).subscribe(
      ()=>{
      console.log('Country ' + country.Name + ' successfuly deleted');
      },
      error=>{alert("Country ' + country.Name + ' failed delete!"); console.log(error);}
    );
  }
}
