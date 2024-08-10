import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
    @IsString({ message: "Username must be string" })
    @IsNotEmpty({ message: "Username must not be empty" })
    @MinLength(5, { message: "Username must be at least 5 characters long" })
    username: string;

    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password must not be empty" })
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    password: string;
}