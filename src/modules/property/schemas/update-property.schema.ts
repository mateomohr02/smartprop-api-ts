import * as z from "zod";

const locationBase = {
  exists: z.boolean(),
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(120).optional(),
};

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
  }).optional(),

  expenses: z.object({
    amount: z.number().optional(),
    currency: z.enum(["ARS", "USD", "EUR", "BRL"]).optional(),
  }).optional(),

  multimedia: z.object({
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    blueprints: z.array(z.string()).optional(),
  }).optional(),

  roomsAmount: z.number().optional(),

  roomsSummary: z.object({
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    garages: z.number().optional(),
  }).optional(),

  surface: z.object({
    total: z.number().optional(),
    covered: z.number().optional(),
  }).optional(),

  services: z.object({
    light: z.boolean().optional(),
    gas: z.boolean().optional(),
    water: z.boolean().optional(),
  }).optional(),

  condition: z.enum(["new", "like-new", "good", "to-renovate"]).optional(),
  age: z.number().optional(),

  availability: z.object({
    type: z.enum(["immediate", "date"]).optional(),
    date: z.date().optional(),
  }).optional(),

  location: z.object({
    address: z.object({
      street: z.string(),
      number: z.number().optional(),
    }),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }).optional(),

  // ---------------- LOCATION ----------------

  country: z
    .object({
      ...locationBase,
    })
    .optional(),

  province: z
    .object({
      ...locationBase,
      countryId: z.string().uuid().optional(),
    })
    .optional(),

  city: z
    .object({
      ...locationBase,
      provinceId: z.string().uuid().optional(),
    })
    .optional(),

  neighborhood: z
    .object({
      ...locationBase,
      cityId: z.string().uuid().optional(),
    })
    .optional(),
})
.superRefine((data, ctx) => {
  const { country, province, city, neighborhood } = data;

  const validateExists = (obj: any, name: string) => {
    if (!obj) return;

    if (obj.exists && !obj.id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${name} requires id when exists=true`,
      });
    }

    if (!obj.exists && !obj.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${name} requires name when exists=false`,
      });
    }
  };

  validateExists(country, "Country");
  validateExists(province, "Province");
  validateExists(city, "City");
  validateExists(neighborhood, "Neighborhood");
});

export type UpdatePropertySchemaType = z.infer<typeof UpdatePropertySchema>;