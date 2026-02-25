import * as z from "zod";

export const RelateRoomsSchema = z.object({
    propertyId: z.string().uuid(),
    rooms: z.array(z.object({
        exists: z.boolean(),
        id: z.string().uuid().optional(),
        detail: z.object({
            amount: z.number().min(1).nonnegative(),
            size: z.array(z.number()).optional()
        }),
        name: z.string().optional(),
    }))
})

export type RelateRoomsSchemaType = z.infer<typeof RelateRoomsSchema>;