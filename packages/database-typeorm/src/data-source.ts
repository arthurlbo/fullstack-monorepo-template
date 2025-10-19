import { env } from "@repo/env";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    synchronize: false,
    entities: ["./entities/*.entity{.ts,.js}"],
    migrations: ["./migrations/**/*"],
};

const AppDataSource = new DataSource(dataSourceOptions);

export { AppDataSource, dataSourceOptions };
