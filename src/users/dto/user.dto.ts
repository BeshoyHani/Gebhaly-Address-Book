import {IsNotEmpty, IsDate, IsEmail, Length } from "class-validator";

export class UserDto {
    id?: string;
    @IsNotEmpty()
    @Length(3)
    first_name: string;

    @IsNotEmpty()
    @Length(3)
    last_name: string;

    @IsEmail()
    email: string;

    @Length(8)
    password: string;

    @IsDate()
    registeredSince: Date;
}