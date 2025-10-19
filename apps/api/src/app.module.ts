import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppDataSource } from "@repo/database-typeorm";
import { env } from "@repo/env";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [() => env],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => AppDataSource.options,
            dataSourceFactory: async () => {
                if (!AppDataSource.isInitialized) {
                    await AppDataSource.initialize();
                }

                return AppDataSource;
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
