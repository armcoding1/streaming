import { JwtVariablesType } from "../typings/jwt.type";
import * as dotenv from "dotenv";

dotenv.config();

export const jwtVariables: JwtVariablesType = {
    JWT_SECRET: process.env.JWT_SECRET ?? "",
    JWT_EXPIRES: process.env.JWT_EXPIRES ?? "",
}