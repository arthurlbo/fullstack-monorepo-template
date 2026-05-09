import { User } from "../../domain/entities/user.entity";
import { UserEntity } from "./user.entity";

export const UserMapper = {
    toDomain(entity: UserEntity): User {
        return new User(entity.id, entity.name, entity.email, entity.createdAt, entity.updatedAt);
    },
};
