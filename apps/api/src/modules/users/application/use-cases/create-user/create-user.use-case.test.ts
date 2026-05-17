import { ConflictException } from "@nestjs/common";

import type { Mocked } from "vitest";

import type { User } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repositories/user.repository";
import { CreateUserUseCase } from "./create-user.use-case";

const makeUser = (overrides: Partial<User> = {}): User => ({
    id: "user-id",
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

const makeRepository = (): Mocked<IUserRepository> => ({
    findAll: vi.fn(),
    findById: vi.fn(),
    findByEmail: vi.fn(),
    create: vi.fn(),
});

describe("CreateUserUseCase", () => {
    let repository: Mocked<IUserRepository>;
    let sut: CreateUserUseCase;

    beforeEach(() => {
        repository = makeRepository();
        sut = new CreateUserUseCase(repository);
    });

    it("should create a user successfully", async () => {
        const user = makeUser();
        repository.findByEmail.mockResolvedValue(null);
        repository.create.mockResolvedValue(user);

        const result = await sut.execute({ name: user.name, email: user.email });

        expect(result).toEqual(user);
        expect(repository.findByEmail).toHaveBeenCalledWith(user.email);
        expect(repository.create).toHaveBeenCalledWith({ name: user.name, email: user.email });
    });

    it("should throw ConflictException when email is already registered", async () => {
        const user = makeUser();
        repository.findByEmail.mockResolvedValue(user);

        await expect(sut.execute({ name: user.name, email: user.email })).rejects.toThrow(ConflictException);

        expect(repository.create).not.toHaveBeenCalled();
    });
});
