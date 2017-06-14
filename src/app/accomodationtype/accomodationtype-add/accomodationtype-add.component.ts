import { Component, OnInit } from '@angular/core';
import {AccomodationType} from "../accomodationtype.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpAccomodationTypeService} from "../accomodationtype.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accomodationtype-add',
  templateUrl: './accomodationtype-add.component.html',
  styleUrls: ['./accomodationtype-add.component.css'],
  providers: [HttpAccomodationTypeService]
})
export class AccomodationtypeAddComponent implements OnInit {
  
  nAccomodationType:any={};

  constructor(private httpAccomodationTypeService:HttpAccomodationTypeService,private router: Router) { }

  ngOnInit() {
  }

  saveAccomodationType(accomodationType: AccomodationType, form: NgForm){
            
       this.httpAccomodationTypeService.postAccomodationType(accomodationType).subscribe(
          ()=>{ 
            console.log('AccomodationType successfuly posted');
            this.router.navigate(['/accomodation-type']);
          },
          error => {alert("Close!"); console.log(error);}
        );
  }

}
