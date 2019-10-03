import { Address } from "app/accomodation/accommodation.model";

export class User{

    Id:number;
    username:string;
    password:string;
    firstName:string;
    lastName:string;
    email:string;
}

export class Agent {
    id:number;
    user:User;
    pib:string;
    address:Address;
}