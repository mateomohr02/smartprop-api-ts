import * as z from "zod";

export const GetProvincesForCountrySchema = z.object({
    id: z.string(),
}).optional();

export type GetProvincesForCountrySchemaType = z.infer<typeof GetProvincesForCountrySchema>;