import type { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { z } from "zod";

export function zodToSwagger(schema: z.ZodType): SchemaObject {
    return z.toJSONSchema(schema) as SchemaObject;
}
