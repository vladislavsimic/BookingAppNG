import { Component, OnInit } from '@angular/core';
import {HttpAccomodationServicesService} from "../accomodation-service.service"
import {MdSnackBar} from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import { AccomodationServices } from '../accomodation-service.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-accomodation-services-add',
  templateUrl: './accomodation-services-add.component.html',
  styleUrls: ['./accomodation-services-add.component.css'],
  providers: [HttpAccomodationServicesService]
})
export class AccomodationServicesAddComponent implements OnInit {

  private nAccService:any={};

  constructor(private HttpAccomodationServicesService:HttpAccomodationServicesService,
              private router: Router,
              private snackBar:MdSnackBar) { }

  ngOnInit() {
  }

  saveAccomodationService(accomodationService: AccomodationServices, form: NgForm){
            
    this.HttpAccomodationServicesService.postAccomodationService(accomodationService).subscribe(
       ()=>{ 
         console.log('Accomodation Service successfuly posted');
         this.snackBar.open("Accomodation Service successfuly posted", "", { duration: 2500,});
         this.router.navigate(['/accomodation-services']);
       },
       error => {alert("Close!"); console.log(error);}
     );
}

}
