import * as z from "zod";

export const FindOrCreateNeighborhoodSchema = z.discriminatedUnion("exists", [
  z.object({
    exists: z.literal(true),
    cityId: z.string(),
    id: z.string(),
  }),
  z.object({
    exists: z.literal(false),
    cityId: z.string(),
    name: z.string(),
  }),
]);

export type FindOrCreateNeighborhoodSchemaType = z.infer<typeof FindOrCreateNeighborhoodSchema>;
