import { z } from "zod";

export const storesSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullish(),
    logo: z.string().url()
})

export const storeCreateSchema = storesSchema.omit({
    id: true
})

export const storeUpdateSchema = storeCreateSchema.partial()

export const allStoresSchema = z.array(storesSchema)