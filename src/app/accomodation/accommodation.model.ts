import {AccomodationType} from "app/accomodationtype/accomodationtype.model"
import { AccomodationServices } from "app/accomodation-services/accomodation-service.model";

export class Accommodation{

    id:number;
    name:string;
    description:string;
    address:Address;
    agentId:string;

    price: number;
    category: string;
    createdAt: Date;
    imageUrls: string[];
    numberOfCancellationDays: number;
    numberOfPeople: number;
    services: Array<string>;
    propertyServices : string[];
    stars: number;
    typeId: string;
    type:string;
}

export class Address{

    Id:string;
    city: string;
    country: string;
    latitude:  number;
    longitude: number;
    street: string;
}