import { IsNotEmpty } from "class-validator";

export class AuthDTO{
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;
}