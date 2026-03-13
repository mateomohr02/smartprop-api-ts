import * as z from "zod";

export const GetCitiesForProvinceSchema = z.object({
    id: z.string(),
}).optional();

export type GetCitiesForProvinceSchemaType = z.infer<typeof GetCitiesForProvinceSchema>;