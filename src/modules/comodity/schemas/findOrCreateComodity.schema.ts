import * as z from "zod";

export const FindOrCreateComoditySchema = z.object({
  propertyId: z.string().uuid(),

  comodities: z.array(
    z.object({
      exists: z.boolean(),
      name: z.string().min(2).max(120).optional(),
      id: z.string().uuid().optional(),
    }),
  ),
});

export type FindOrCreateComoditySchemaType = z.infer<
  typeof FindOrCreateComoditySchema
>;
