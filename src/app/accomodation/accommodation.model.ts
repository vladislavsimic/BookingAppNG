import {AccomodationType} from "app/accomodationtype/accomodationtype.model"

export class Accommodation{

    id:number;
    name:string;
    description:string;
    address:Address;
    agentId:string;

    autumnPrice: number;
    category: string;
    createdAt: Date;
    imageUrls: string[];
    numberOfCancellationDays: number;
    numberOfPeople: number;
    propertyServices: string[];
    springPrice: number;
    stars: number;
    summerPrice: number;
    typeId: string;
    winterPrice: number;
}

export class Address{

    Id:string;
    city: string;
    country: string;
    latitude:  number;
    longitude: number;
    street: string;
}