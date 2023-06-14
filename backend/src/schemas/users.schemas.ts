import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    permission: z.enum(["user", "admin", "merchant"]).default("user"),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
    deletedAt: z.string().or(z.date()).nullish()
})

export const userCreateSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true
})

export const userUpdateSchema = userCreateSchema.omit({
    permission: true
}).partial()

export const oneUserResponseSchema = userSchema.omit({password: true})

export const allUsersResponseSchema = z.array(oneUserResponseSchema)