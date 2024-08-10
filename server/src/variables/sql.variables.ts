import { SqlVariablesType } from "src/typings/sql.type";
import * as dotenv from "dotenv";

dotenv.config();

export const sqlVariables: SqlVariablesType = {
    SQL_HOST: process.env.SQL_HOST ?? "",
    SQL_PORT: parseInt(process.env.SQL_PORT ?? "0", 10),
    SQL_USER: process.env.SQL_USER ?? "",
    SQL_PASS: process.env.SQL_PASS ?? "",
    SQL_NAME: process.env.SQL_NAME ?? "",
}