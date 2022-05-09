import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../models/User";
import Organization from "../models/Organization";
import Commission from "../models/Commission";
import Belongs from "../models/Belongs";

const appDataSource =  new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "admin",
    password: "1234",
    database: "admin",
    synchronize: false,
    entities: [
        User, 
        Organization,
        Commission,
        Belongs
    ]
}).initialize();

export default appDataSource;