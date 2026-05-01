import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { dataSourceOptions } from "./data-source";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                ...dataSourceOptions,
                autoLoadEntities: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
