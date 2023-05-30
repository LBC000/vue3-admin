import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "express_ts_typeorm_test",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
});
