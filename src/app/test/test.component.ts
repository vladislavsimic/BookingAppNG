import { Component, OnInit } from '@angular/core';
import {Country} from "../country.model"
import { Http, Response } from '@angular/http';
import {HttpCountryService} from "../services/country.service"
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [HttpCountryService]
})
export class TestComponent implements OnInit {
  
  private countries:Array<Country>;

  constructor(private httpCountryService:HttpCountryService) {
   }

  ngOnInit() {
    this.httpCountryService.getCountries().subscribe(
      (res: any) => {this.countries = res; console.log(this.countries)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }
}
