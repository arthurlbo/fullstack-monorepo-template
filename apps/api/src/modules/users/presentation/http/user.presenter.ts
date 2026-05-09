import type { TUserOutput } from "@repo/contracts/users";

import type { User } from "../../domain/entities/user.entity";

export const UserPresenter = {
    toResponse(user: User): TUserOutput {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },
};
