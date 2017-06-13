import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Region} from "./region.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpRegionService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getRegions(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"region/regions").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getRegion(Id:number){
        return this.http.get(this.appUrl.RootLocation+'region/region/'+Id).map(this.extractData);
    }

    postRegion(region: Region): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'region/region', region , opts);
    }

    deleteRegion(Id:number){
        return this.http.delete(this.appUrl.RootLocation + 'region/region/'+ Id);
    }

    editRegion(region:Region){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'region/region/'+region.Id, region, opts);
    }
}