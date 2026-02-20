import { z } from "zod"

export const CreateSubscriptionSchema = z.object({
    planId: z.string().uuid(),
    billingCycle: z.enum(['monthly', 'quarterly', 'semester', 'yearly']),
    autoRenew: z.boolean(),
    features: z.object({ 
        metrics: z.enum(['base', 'segmented']),
        cashflow: z.boolean(),
        propertiesManager: z.boolean(),
        ai: z.boolean(),
        socialMedia: z.boolean()
    }),
    price: z.number()
})

export type CreateSubscriptionSchemaType = z.infer<typeof CreateSubscriptionSchema>