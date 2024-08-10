import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDTO {
    @IsString({ message: "Username must be string" })
    @IsNotEmpty({ message: "Username must not be empty" })
    @MinLength(5, {message: "Username must be at least 5 characters long"})
    username: string;

    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password must not be empty" })
    @MinLength(8, {message: "Password must be at least 8 characters long"})
    password: string;

    @IsString({ message: "First Name must be a string" })
    @IsNotEmpty({ message: "First Name must not be empty" })
    firstName: string;

    @IsString({ message: "Last Name must be a string" })
    @IsNotEmpty({ message: "Last Name must not be empty" })
    lastName: string;
}