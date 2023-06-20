import { z } from "zod";

export const productSchema = z.object({
    id: z.string(),
    name: z.string().min(6),
    description: z.string().nullish(),
    image: z.string().url(),
    price: z.number()
})

export const productCreateSchema = productSchema.omit({
    id: true
})

export const productUpdateSchema = productCreateSchema.partial()