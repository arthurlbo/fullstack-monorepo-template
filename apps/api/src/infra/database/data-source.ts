import { databaseEnv } from "@repo/env";
import { DataSource, type DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: databaseEnv.DB_HOST,
    port: databaseEnv.DB_PORT,
    username: databaseEnv.DB_USERNAME,
    password: databaseEnv.DB_PASSWORD,
    database: databaseEnv.DB_DATABASE,
    synchronize: false,
    entities: ["src/modules/**/infra/typeorm/*.entity.{ts,js}"],
    migrations: ["src/infra/database/migrations/*.{ts,js}"],
};

export const AppDataSource = new DataSource(dataSourceOptions);
