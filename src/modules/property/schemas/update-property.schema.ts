import { exists } from "node:fs";
import * as z from "zod";

export const UpdatePropertySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(10).max(200).optional(),
  description: z.string().min(20).max(1000).optional(),
  propertyType: z
    .object({
      exists: z.boolean(),
      id: z.string().uuid().optional(),
      name: z.string().min(2).max(120).optional(),
    })
    .optional(),

  status: z.enum(["draft", "active", "rented", "sold", "archived"]).optional(),
  isFeatured: z.boolean().optional(),
  price: z.object({
    amount: z.number().optional(),
    currency: z.enum(["ARS", "USD", "EUR", "BRL"]).optional(),
  }),
  expenses: z.object({
    amount: z.number().optional(),
    currency: z.enum(["ARS", "USD", "EUR", "BRL"]).optional(),
  }),
  multimedia: z.object({
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    blueprints: z.array(z.string()).optional(),
  }),
  roomsAmount: z.number().optional(),
  rooms: z.object({
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    garages: z.number().optional(),
  }),
  surface: z.object({
    total: z.number().optional(),
    covered: z.number().optional(),
  }),
  services: z.object({
    light: z.boolean().optional(),
    gas: z.boolean().optional(),
    water: z.boolean().optional(),
  }),
  condition: z.enum(["new", "like-new", "good", "to-renovate"]).optional(),
  age: z.number().optional(),
  availability: z.object({
    type: z.enum(["immediate", "date"]).optional(),
    date: z.date().optional(),
  }),
  location: z.object({
    address: z.object({
      street: z.string(),
      number: z.number().optional(),
    }),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  country: z.object({
    exists: z.boolean(),
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(120).optional(),
  }).optional(),
 province: z.object({
    exists: z.boolean(),
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(120).optional(),
  }).optional(),
  city: z.object({
    exists: z.boolean(),
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(120).optional(),
  }).optional(),
  neighborhood: z.object({
    exists: z.boolean(),
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(120).optional(),
  }).optional()
});

export type UpdatePropertySchemaType = z.infer<typeof UpdatePropertySchema>;
