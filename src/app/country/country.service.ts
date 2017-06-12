import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Country} from "./country.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpCountryService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getCountries(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"country/countries").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getCountry(Id:number){
        return this.http.get(this.appUrl.RootLocation+'country/country/'+Id).map(this.extractData);
    }

    postCountry(country: Country): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'country/country', country , opts);
    }

    deleteCountry(country:Country){
        return this.http.delete(this.appUrl.RootLocation + 'country/country/'+ country.Id);
    }

    editCountry(country:Country){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'country/country/'+country.Id, country , opts);
    }
}