import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Room} from "./room.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpRoomService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getRooms(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"room/rooms").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getRoom(Id:number){
        return this.http.get(this.appUrl.RootLocation+'room/room/'+Id).map(this.extractData);
    }

    postRoom(room: Room): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'room/room', room , opts);
    }

    deleteRoom(Id:number){
        return this.http.delete(this.appUrl.RootLocation + 'room/room/'+ Id);
    }

    editRoom(room:Room){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'room/room/'+room.Id, room , opts);
    }
}