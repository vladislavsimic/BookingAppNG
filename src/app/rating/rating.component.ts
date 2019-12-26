import { Component, OnInit, Input } from '@angular/core';
import { Rating } from 'app/rating/rating.model';
import {MdSnackBar} from "@angular/material"
import {HttpRatingService} from "app/rating/rating.service"
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  public reservationId:string;
  private nRating: any={};
  public numbers : Array<number>;

  constructor(private httpRatingService:HttpRatingService,
              private snackBar:MdSnackBar) {
                this.numbers = [1,2,3,4,5];
               }

  ngOnInit() {
  }

  saveRating(rating: Rating, form: NgForm){
    rating.servicesRating = 1;
    rating.staffRating = 2;
    this.httpRatingService.postRating(rating, this.reservationId).subscribe(
      ()=>{ 
        console.log('Rating successfuly posted');
        this.snackBar.open("Rating successfuly posted", "", { duration: 2500,});            
      },
      error => {alert("Close!"); console.log(error);}
  );
  }

}
