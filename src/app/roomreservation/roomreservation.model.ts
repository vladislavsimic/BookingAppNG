import {User} from 'app/register/user.model';
import {Accommodation} from 'app/accomodation/accommodation.model';

export class Reservation{

    Id:number;

    reservationStatus:string;
    price : number;
    property : Accommodation;
    user: User;
    rating:number;
    startDate:Date;
    endDate:Date;
    numberOfPeople : number;
    cancellationPrice : number;
}

export class Rating{

    Id:number;
    reservation : string;
    overallRating: number;
    staffRating: number;
    servicesRating : number;
    comment : string;
    isCommentReviewed : boolean;
    isCommentApproved : boolean;
}