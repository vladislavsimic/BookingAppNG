import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Comment} from "../comment.model"
import { Http, Headers, Response } from '@angular/http';
import {HttpCommentService} from "../comment.service"
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {AppUrl} from "app/appservice/AppUrl.services"
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css'],
  providers : [HttpCommentService]
})
export class CommentEditComponent implements OnInit {

  @Input() eComment:Comment;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpCommentService:HttpCommentService,private router: Router) {
    this.notifyParent=new EventEmitter();
   }

  ngOnInit() {
  }

  editComment(comment: Comment, form: NgForm){
    
      this.httpCommentService.editComment(comment).subscribe(
          ()=>{ 
            console.log('Comment successfuly edited');
            this.notifyParent.emit('Some value to send to the parent');
          },
          error => {alert("Close!"); console.log(error);}
        );
       
  }
}
