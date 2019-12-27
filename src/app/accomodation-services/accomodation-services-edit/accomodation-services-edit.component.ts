import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AccomodationServices } from '../accomodation-service.model';
import { HttpAccomodationServicesService } from '../accomodation-service.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-accomodation-services-edit',
  templateUrl: './accomodation-services-edit.component.html',
  styleUrls: ['./accomodation-services-edit.component.css'],
  providers: [HttpAccomodationServicesService]
})
export class AccomodationServicesEditComponent implements OnInit {

  @Input() eAccomodationService:AccomodationServices;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private HttpAccomodationServicesService:HttpAccomodationServicesService,
              private router: Router,
              private snackBar:MdSnackBar) {
                this.notifyParent=new EventEmitter();
               }

  ngOnInit() {
  }

  editAccomodationServices(accomodationServices: AccomodationServices, form: NgForm){
      accomodationServices.id = this.eAccomodationService.id;
      this.HttpAccomodationServicesService.editAccomodationServices(accomodationServices).subscribe(
          ()=>{ 
            console.log('Accomodation Services successfuly edited');
            this.snackBar.open("Accomodation Services successfuly edited", "", { duration: 2500,});
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
