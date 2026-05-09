import type { ICreateUserDTO } from "../dtos/create-user.dto";
import type { User } from "../entities/user.entity";

export const USER_REPOSITORY = Symbol("IUserRepository");

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: ICreateUserDTO): Promise<User>;
}
