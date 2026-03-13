import * as z from "zod";

export const FindOrCreateProvinceSchema = z.discriminatedUnion("exists", [
  z.object({
    exists: z.literal(true),
    countryId: z.string(),
    id: z.string(),
  }),
  z.object({
    exists: z.literal(false),
    countryId: z.string(),
    name: z.string(),
  }),
]);

export type FindOrCreateProvinceSchemaType = z.infer<typeof FindOrCreateProvinceSchema>;
