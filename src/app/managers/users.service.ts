import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from "app/register/user.model"
import {AppUrl} from "app/appservice/AppUrl.services"
import {Manager} from "./manager.model"

@Injectable()
export class HttpUsersService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getRequestOptions(){
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let access_token=localStorage.getItem('id_token');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return opts;
    }

    getManagers(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation + this.appUrl.MainBackend + "users/agents", this.getRequestOptions()).map(this.extractData);
    }

    /*getUser(username:string):Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"appUser/manager/"+username).map(this.extractData);
    }*/

    unblockManager(id:string) {
        return this.http.patch(this.appUrl.RootLocation + this.appUrl.MainBackend + "users/" + id + "/unblock", null, this.getRequestOptions());
    }

    blockManager(id:string) {
        return this.http.patch(this.appUrl.RootLocation + this.appUrl.MainBackend + "users/" + id + "/block", null, this.getRequestOptions());
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
}