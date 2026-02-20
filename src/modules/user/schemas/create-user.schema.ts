import { z } from "zod"

export const CreateUserSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    password: z.string().min(8),
    email: z.string().email(),
    phone: z.string().optional(),
    role: z.enum(["admin", "user", "viewer"])
})

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

