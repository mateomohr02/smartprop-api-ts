import * as z from "zod"

export const metricTypes = [
  "visit-site",
  "visit-blog",
  "visit-contact",
  "detail-post",
  "detail-property",
  "share-post",
  "share-property",
  "contact-whatsapp",
  "contact-instagram",
  "contact-phone",
  "contact-email",
  "contact-form",
  "search"
] as const

export const metricSources = [
  "organic",
  "facebook",
  "instagram",
  "google-campaign",
  "tiktok",
] as const

export type MetricType = typeof metricTypes[number]
export type MetricSource = typeof metricSources[number]

export const CreateMetricSchema = z.object({
  typeSlug: z.enum(metricTypes),

  sourceSlug: z.enum(metricSources),

  campaignId: z.string().uuid().nullable().optional(),

  propertyId: z.string().uuid().nullable().optional(),

  postId: z.string().uuid().nullable().optional(),
})

export type CreateMetricSchemaType = z.infer<typeof CreateMetricSchema>