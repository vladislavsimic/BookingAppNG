import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppUrl} from "app/appservice/AppUrl.services"
import { Rating } from "app/rating/rating.model";

@Injectable()
export class HttpRatingService{
    
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

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getAccomodationRatings(accomodationId: string) {
        return this.http.get(this.appUrl.RootLocation + this.appUrl.MainBackend + 'ratings/property/'+accomodationId, this.getRequestOptions()).map(this.extractData);
    }

    postRating(rating: Rating, reservationId:string): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation + this.appUrl.MainBackend + 'ratings/' + reservationId, rating , this.getRequestOptions());
    }
}