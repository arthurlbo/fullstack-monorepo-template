import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserSchema, UserSchema, type TUserOutput } from "@repo/contracts/users";

import { ZodValidationPipe } from "@/shared/pipes/zod-validation.pipe";
import { zodToSwagger } from "@/shared/utils/zod-swagger";
import { CreateUserUseCase } from "../../application/use-cases/create-user/create-user.use-case";
import type { ICreateUserDTO } from "../../domain/dtos/create-user.dto";
import { UserPresenter } from "./user.presenter";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly createUser: CreateUserUseCase) {}

    @Post()
    @ApiOperation({ summary: "Create a new user" })
    @ApiBody({ schema: zodToSwagger(CreateUserSchema) })
    @ApiCreatedResponse({ schema: zodToSwagger(UserSchema) })
    async create(@Body(new ZodValidationPipe(CreateUserSchema)) data: ICreateUserDTO): Promise<TUserOutput> {
        const user = await this.createUser.execute(data);
        return UserPresenter.toResponse(user);
    }
}
