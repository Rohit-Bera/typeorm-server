import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book"
import { UsersBook } from "./entity/UsersBook"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1979rohit9324",
    database: "typeorm",
    synchronize: true,
    logging: false,
    // change this to reflect in the database
    entities: [User , Book , UsersBook],
    migrations: ["src/../**/*.migration.{js,ts}"],
    subscribers: [],
})
