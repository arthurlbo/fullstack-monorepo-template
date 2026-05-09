import { ConflictException, Inject, Injectable } from "@nestjs/common";

import type { ICreateUserDTO } from "../../../domain/dtos/create-user.dto";
import type { User } from "../../../domain/entities/user.entity";
import { type IUserRepository, USER_REPOSITORY } from "../../../domain/repositories/user.repository";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly users: IUserRepository,
    ) {}

    async execute(data: ICreateUserDTO): Promise<User> {
        const existing = await this.users.findByEmail(data.email);
        if (existing) throw new ConflictException("Email already registered");

        return this.users.create(data);
    }
}
