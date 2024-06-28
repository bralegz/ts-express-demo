import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "demo_typeorm",
    synchronize: true,
    logging: false, // don't log queries in the console
    entities: [User],
    subscribers: [],
    migrations: [],
})


export const UserModel = AppDataSource.getRepository(User);