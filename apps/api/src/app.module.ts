import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "./health/health.module";
import { DatabaseModule } from "./infra/database/database.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }), DatabaseModule, HealthModule, UsersModule],
})
export class AppModule {}
