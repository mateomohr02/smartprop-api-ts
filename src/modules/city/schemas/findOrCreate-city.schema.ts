import * as z from "zod";

export const FindOrCreateCitySchema = z.discriminatedUnion("exists", [
  z.object({
    exists: z.literal(true),
    provinceId: z.string(),
    id: z.string(),
  }),
  z.object({
    exists: z.literal(false),
    provinceId: z.string(),
    name: z.string(),
  }),
]);

export type FindOrCreateCitySchemaType = z.infer<typeof FindOrCreateCitySchema>;
