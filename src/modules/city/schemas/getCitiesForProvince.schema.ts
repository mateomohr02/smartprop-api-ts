import * as z from "zod";

export const GetCitiessForProvinceSchema = z.object({
    id: z.string(),
}).optional();

export type GetCitiesForProvinceSchemaType = z.infer<typeof GetCitiessForProvinceSchema>;