import {Injectable} from '@angular/core'

@Injectable()
export class AppUrl{

    public RootLocation: string;

    public MainBackend: string;

    public ReservationService : string;

    constructor(){
        this.RootLocation = "http://localhost:8765/";
        this.MainBackend = "main-backend/";
        this.ReservationService = "reservations-microservice/"
    }
}