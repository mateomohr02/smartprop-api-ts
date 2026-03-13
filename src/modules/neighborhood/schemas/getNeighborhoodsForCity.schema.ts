import * as z from "zod";

export const GetNeighborhoodsForCitySchema = z.object({
    id: z.string(),
}).optional();

export type GetNeighborhoodsForCitySchemaType = z.infer<typeof GetNeighborhoodsForCitySchema>;