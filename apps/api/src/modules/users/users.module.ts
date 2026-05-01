import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateUserUseCase } from "./application/use-cases/create-user/create-user.use-case";
import { USER_REPOSITORY } from "./domain/repositories/user.repository";
import { UserEntity } from "./infra/typeorm/user.entity";
import { UserRepository } from "./infra/typeorm/user.repository";
import { UsersController } from "./presentation/http/users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [
        CreateUserUseCase,
        {
            provide: USER_REPOSITORY,
            useClass: UserRepository,
        },
    ],
    exports: [USER_REPOSITORY],
})
export class UsersModule {}
