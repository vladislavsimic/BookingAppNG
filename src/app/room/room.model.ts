import {RoomReservation} from "app/roomreservation/roomreservation.model";
import {Accommodation} from "app/accomodation/accommodation.model";
export class Room{

    Id:number;
    RoomNumber:number;
    BedCount:number;
    Description: string;
    PricePerNight:number;
    Accommodation:Accommodation
    Acc_Id:number;
    RoomReservations:Array<RoomReservation>;
}