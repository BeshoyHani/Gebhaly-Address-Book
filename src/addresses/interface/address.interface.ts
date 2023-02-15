import {IsNotEmpty, Length, IsPhoneNumber } from "class-validator";

export class IAddress {
    id?: string;
    userID: string;
    
    @IsNotEmpty()
    @Length(3)
    first_name: string;
    
    @IsNotEmpty()
    @Length(3)
    last_name: string;

    @IsNotEmpty()
    @Length(5)
    address: string;

    @IsPhoneNumber()
    phone: string;
}