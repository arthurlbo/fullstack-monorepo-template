import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { dataSourceOptions } from "./data-source";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                ...dataSourceOptions,
                autoLoadEntities: true,
                entities: [], // globs in dataSourceOptions are for the TypeORM CLI only
                migrations: [],
            }),
        }),
    ],
})
export class DatabaseModule {}
