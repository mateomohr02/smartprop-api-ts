import * as z from 'zod';

export const CreatePropertySchema = z.object({
    title:z.string().min(10).max(200).optional(),
    description:z.string().min(20).max(1000).optional(),
    propertyType:z.object({
        exists:z.boolean(),
        id:z.string().uuid().optional(),
        name:z.string().min(2).max(120).optional(),
    }).optional()
})

export type CreatePropertySchemaType = z.infer<typeof CreatePropertySchema>;