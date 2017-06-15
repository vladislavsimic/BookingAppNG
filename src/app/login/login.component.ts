import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { HttpAuthenticationService } from 'app/login/userAuthentication.service'
import { FormsModule, NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpAuthenticationService]
})
export class LoginComponent implements OnInit {

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private httpAuthenticationService:HttpAuthenticationService,
              private router:Router) {
                this.notifyParent=new EventEmitter();
               }

  ngOnInit() {
  }

  login(user:any,form:NgForm){

    this.httpAuthenticationService.login(user.username,user.password).subscribe(

      response=>{
        localStorage.setItem('id_token',response.json().access_token);
        localStorage.setItem('role',response.headers.get('Role'));
        localStorage.setItem('username',user.username);
        alert("User logged in.")
        console.log(response.json());                    
        this.notifyParent.emit('Some value to send to the parent');
      },
      error=>{
        console.log(error.text());
      }

    );
  }

}
