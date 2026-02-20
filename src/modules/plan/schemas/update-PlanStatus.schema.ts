import * as z from "zod";

export const UpdatePlanSchema = z.object({
    isActive: z.boolean(),
});

export type UpdatePlanSchemaType = z.infer<typeof UpdatePlanSchema>;