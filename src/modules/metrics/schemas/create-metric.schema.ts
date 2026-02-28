import * as z from "zod";

export const CreateMetricSchema = z.object({
    type: z.enum([
        "visit_site",
        "visit_blog",
        "visit_post",
        "visit_property",
        "share_property",
        "share_post",
        "search",
        "contact_whatsapp",
        "contact_email",
        "contact_instagram",
        "contact_facebook",
        "contact_form",
    ]),
    propertyId: z.string().uuid().optional(),
    postId: z.string().uuid().optional(),
    source: z.enum(['organic', 'instagram', 'facebook', 'tiktok', 'google']).optional(),
    campaignId: z.string().optional()
})

export type CreateMetricSchemaType = z.infer<typeof CreateMetricSchema>;