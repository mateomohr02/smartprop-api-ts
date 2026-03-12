import * as z from 'zod';

export const FindOrCreateCountrySchema = z.discriminatedUnion("exists", [
  z.object({
    exists: z.literal(true),
    id: z.string()
  }),
  z.object({
    exists: z.literal(false),
    name: z.string()
  })
]);

export type FindOrCreateCountrySchemaType = z.infer<typeof FindOrCreateCountrySchema>;