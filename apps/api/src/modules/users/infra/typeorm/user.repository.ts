import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import type { Repository } from "typeorm";

import type { ICreateUserDTO } from "../../domain/dtos/create-user.dto";
import type { User } from "../../domain/entities/user.entity";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "./user.entity";
import { UserMapper } from "./user.mapper";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
    ) {}

    async findAll(): Promise<User[]> {
        const entities = await this.repo.find();
        return entities.map(UserMapper.toDomain);
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.repo.findOne({ where: { email } });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async create(data: ICreateUserDTO): Promise<User> {
        const entity = await this.repo.save(this.repo.create(data));
        return UserMapper.toDomain(entity);
    }
}
