import { Component, OnInit,Input } from '@angular/core';
import {Comment} from "../comment.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpCommentService} from "../comment.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';
import {Accommodation} from "app/accomodation/accommodation.model"
import {HttpAccommodationService} from "app/accomodation/accommodation.service"

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css'],
  providers: [HttpCommentService]
})
export class CommentAddComponent implements OnInit {

  nComment:any={};
  public accomodations: Array<Accommodation>; 
  constructor(private httpCommentService:HttpCommentService,
  private httpAccService:HttpAccommodationService,
  private router: Router) {
  }
  
  ngOnInit() {
    this.httpAccService.getAccommodations().subscribe((res: any) => {
        this.accomodations = res; console.log(this.accomodations);
      },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
  }

  saveComment(comment: Comment, form: NgForm){
            
       this.httpCommentService.postComment(comment).subscribe(
          ()=>{ 
            console.log('Comment successfuly posted');
            this.router.navigate(['/comment']);
          },
          error => {alert("Close!"); console.log(error);}
        );
  }
}