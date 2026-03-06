import * as z from 'zod';

export const SearchedMetricSchema = z.object({
    typeSlug: z.string(),
    sourceSlug: z.string().optional(),
    campaignId: z.string().optional(),
    propertyId: z.string().optional(),
    postId: z.string().optional(),
    period: z.enum(["day", "month"]),
    periodStart: z.date()    
})

export type SearchedMetricSchemaType = z.infer<typeof SearchedMetricSchema>