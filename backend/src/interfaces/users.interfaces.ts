import { z } from "zod";
import { oneUserResponseSchema, userCreateSchema } from "../schemas/users.schemas";
import { User } from "../entities";
import { DeepPartial } from "typeorm";

export type TUser = User
export type TUserCreate = z.infer<typeof userCreateSchema>
export type TUserPartial = DeepPartial<User>
export type TUserResponse = z.infer<typeof oneUserResponseSchema>
export type TUserPermissions = "user" | "admin" | "merchant" | "owner"