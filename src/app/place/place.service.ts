import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Place} from "./place.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpPlaceService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getPlaces(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"place/places").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getPlace(Id:number){
        return this.http.get(this.appUrl.RootLocation+'place/place/'+Id).map(this.extractData);
    }

    postPlace(place: Place): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'place/place', place , opts);
    }

    deletePlace(Id:number){
        return this.http.delete(this.appUrl.RootLocation + 'place/place/'+ Id);
    }

    editPlace(place:Place){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'place/place/'+place.Id, place, opts);
    }
}