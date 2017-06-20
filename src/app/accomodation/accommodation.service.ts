import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Accommodation} from "./accommodation.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpAccommodationService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getAccommodations(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"acc/accs").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getUserByUsername(username:string){
        return this.http.get(this.appUrl.RootLocation+'appUser/appUsers/'+ username).map(this.extractData);
    }

    getAccommodation(Id:number){
        return this.http.get(this.appUrl.RootLocation+'acc/acc/'+Id).map(this.extractData);
    }

    getImageUrlForAccommodation(id:number):Observable<Response>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.appUrl.RootLocation+'acc/acc/image/'+id , opts);
    }

    postAccommodation(accommodation: Accommodation): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'acc/acc', accommodation , opts);
    }

    deleteAccommodation(Id:number){
        return this.http.delete(this.appUrl.RootLocation + 'acc/acc/'+ Id);
    }

    editAccommodation(accommodation:Accommodation){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'acc/acc/'+accommodation.Id, accommodation, opts);
    }
}