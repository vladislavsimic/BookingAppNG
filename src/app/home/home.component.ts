import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Accommodation } from 'app/accomodation/accommodation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public accomodation : Accommodation;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToAccDetails(){
    
    this.accomodation = new Accommodation();
    this.accomodation.name="vladislav";
    this.accomodation.id=123;

    let navigationExtras: NavigationExtras = {
      queryParams: {
          name: 'Prashobh',
          role: 'Angular developer',
          accId: this.accomodation.id
      }
    }
    // this.router.navigate(['accomodation-view'], navigationExtras);
  }

}
