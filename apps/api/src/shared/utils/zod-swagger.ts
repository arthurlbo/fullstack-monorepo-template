import type { ApiResponseSchemaHost } from "@nestjs/swagger";

import { z } from "zod";

type TSwaggerSchemaObject = ApiResponseSchemaHost["schema"];

export function zodToSwagger(schema: z.ZodType): TSwaggerSchemaObject {
    return z.toJSONSchema(schema, {
        unrepresentable: "any",
        override: ({ zodSchema, jsonSchema }) => {
            if (zodSchema instanceof z.ZodDate) {
                jsonSchema.type = "string";
                jsonSchema.format = "date-time";
            }
        },
    }) as TSwaggerSchemaObject;
}
