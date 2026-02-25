import * as z from "zod";

export const FindOrCreateCharacteristicSchema = z.object({
  propertyId: z.string().uuid(),

  characteristics: z.array(
    z.object({
      exists: z.boolean(),
      name: z.string().min(2).max(120).optional(),
      id: z.string().uuid().optional(),
    }),
  ),
  
});

export type FindOrCreateCharacteristicSchemaType = z.infer<
  typeof FindOrCreateCharacteristicSchema
>;
