import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Vehicle } from "../entities/Vehicle";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "demo_typeorm",
    // dropSchema: true, //erase database content when the server starts
    synchronize: true,
    logging: false, // don't log queries in the console
    entities: [User, Vehicle],
    subscribers: [],
    migrations: [],
})


export const UserModel = AppDataSource.getRepository(User);
export const VehicleModel = AppDataSource.getRepository(Vehicle);
