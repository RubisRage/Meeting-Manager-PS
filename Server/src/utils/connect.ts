import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../models/User";
import Organization from "../models/Organization";
import Commission from "../models/Commission";

const appDataSource =  new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "admin",
    password: "1234",
    database: "admin",
    entities: [
        User, 
        Organization,
        Commission
    ]
}).initialize();

export default appDataSource;