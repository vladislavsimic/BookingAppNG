import {User} from 'app/register/user.model';
import {Accommodation} from 'app/accomodation/accommodation.model';
import { AccomodationComponent } from 'app/accomodation/accomodation.component';

export class Reservation{

    id:string;

    price:number;
    propertyId: number;
    numberOfPeople:number;
    startDate:string;
    endDate:string;
    propertyResponse : Accommodation;
    reservationStatus : ReservationStatus;
}

export class ReservationCheck{
    reservationFree:boolean;
}

export enum ReservationStatus {
    PENDING, 
    SUCCESSFUL, 
    CANCELED
}