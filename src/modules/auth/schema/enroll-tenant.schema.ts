import { z } from "zod"

export const EnrollTenantSchema = z.object({
    tenant:z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional()
    }),
    user:z.object({
        name: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        password: z.string().min(8)
    }),
    subscription: z.object({

    })
})

export type EnrollTenantSchemaType = z.infer<typeof EnrollTenantSchema>