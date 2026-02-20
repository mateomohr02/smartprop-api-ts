import { z } from "zod"

export const CreateTenantSchema =  z.object({
    name: z.string(),
    email: z.email(),
    phone: z.string().optional()
})

export type CreateTenantSchemaType = z.infer<typeof CreateTenantSchema>;