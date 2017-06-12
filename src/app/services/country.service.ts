import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Country} from "../country.model"
import {AppUrl} from "app/services/AppUrl.services"

@Injectable()
export class HttpCountryService{

    data: any;

    constructor (private http: Http,private appUrl:AppUrl){

    }

    getCountries(): Observable<any> {

        return this.http.get(this.appUrl.RootLocation+"country/countries").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
}