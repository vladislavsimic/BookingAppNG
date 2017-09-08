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

    getRooms(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"room/rooms").map(this.extractData);        
    }

    getRoom(Id:number){
        return this.http.get(this.appUrl.RootLocation+'room/room/'+Id).map(this.extractData);
    }

    postRoom(room: Room): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation+'room/room', room , this.getRequestOptions());
    }

    deleteRoom(Id:number) {
        return this.http.delete(this.appUrl.RootLocation + 'room/room/'+ Id,this.getRequestOptions());
    }

    editRoom(room:Room) {
        return this.http.put(this.appUrl.RootLocation+'room/room/'+room.Id, room , this.getRequestOptions());
    }
}