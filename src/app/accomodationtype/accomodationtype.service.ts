import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AccomodationType} from "./accomodationtype.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpAccomodationTypeService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getAccomodationTypes(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"accomodationType/accTypes").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getAccomodationType(Id:number){
        return this.http.get(this.appUrl.RootLocation+'accomodationType/accType/'+Id).map(this.extractData);
    }

    postAccomodationType(accomodationType: AccomodationType): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'accomodationType/accType', accomodationType , opts);
    }

    deleteAccomodationType(Id:number){
        return this.http.delete(this.appUrl.RootLocation + 'accomodationType/accType/'+ Id);
    }

    editAccomodationType(accomodationType:AccomodationType){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'accomodationType/accType/'+accomodationType.Id, accomodationType, opts);
    }
}