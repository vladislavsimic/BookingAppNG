import {User} from 'app/register/user.model';
import {Accommodation} from 'app/accomodation/accommodation.model';

export class Reservation{

    Id:number;

    price:number;
    accomodation: Accommodation;
    startDate:Date;
    endDate:Date;
}