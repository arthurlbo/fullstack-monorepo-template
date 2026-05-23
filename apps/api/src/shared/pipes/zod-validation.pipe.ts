import { BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";

import type { ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform<T, T> {
    constructor(private readonly schema: ZodSchema<T>) {}

    transform(value: T): T {
        const result = this.schema.safeParse(value);

        if (!result.success) {
            throw new BadRequestException({
                message: "Validation failed",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        return result.data;
    }
}
