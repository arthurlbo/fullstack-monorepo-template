import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(1, "Name is required").describe("Full name of the user"),
    email: z.email("Invalid email address").describe("Email address used for login"),
});

export type TCreateUserInput = z.infer<typeof CreateUserSchema>;

export const UserSchema = z.object({
    id: z.uuid().describe("Unique user identifier"),
    name: z.string().describe("Full name of the user"),
    email: z.email().describe("Email address used for login"),
    createdAt: z.date().describe("Timestamp when the user was created"),
    updatedAt: z.date().describe("Timestamp of the last update"),
});

export type TUserOutput = z.infer<typeof UserSchema>;
