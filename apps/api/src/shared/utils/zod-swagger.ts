import type { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { z } from "zod";

export function zodToSwagger(schema: z.ZodType): SchemaObject {
    return z.toJSONSchema(schema, {
        unrepresentable: "any",
        override: ({ zodSchema, jsonSchema }) => {
            if (zodSchema instanceof z.ZodDate) {
                jsonSchema.type = "string";
                jsonSchema.format = "date-time";
            }
        },
    }) as SchemaObject;
}
