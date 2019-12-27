import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppUrl} from "app/appservice/AppUrl.services"
import { AccomodationServices } from "app/accomodation-services/accomodation-service.model";

@Injectable()
export class HttpAccomodationServicesService{
    
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

    getServices() {
        return this.http.get(this.appUrl.RootLocation + this.appUrl.AccomodationServicesService + 'services', this.getRequestOptions()).map(this.extractData);
    }

    postAccomodationService(accomodationService: AccomodationServices): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation + this.appUrl.AccomodationServicesService+'services', accomodationService , this.getRequestOptions());
    }

    editAccomodationServices(accomodationService:AccomodationServices) {
        return this.http.put(this.appUrl.RootLocation + this.appUrl.AccomodationServicesService+'services/'+accomodationService.id, accomodationService, this.getRequestOptions());
    }
}