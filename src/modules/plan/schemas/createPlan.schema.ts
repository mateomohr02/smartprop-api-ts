import { z } from "zod"

export const CreatePlanSchema = z.object({
    name: z.string(),
    price: z.number(),
    features: z.object({
        metrics: z.enum(["base", "segmented"]),
        cashflow: z.boolean(),
        propertiesManager: z.boolean(),
        ai: z.boolean(),
        socialMedia: z.boolean(),
    }),
    isActive: z.boolean().optional(),
});

export type CreatePlanSchemaType = z.infer<typeof CreatePlanSchema>;

