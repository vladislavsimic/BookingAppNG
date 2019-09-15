import {Place} from "app/place/place.model";

export class Accommodation{

    Id:number;
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
    type: string;
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