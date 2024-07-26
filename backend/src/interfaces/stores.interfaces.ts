import { z } from "zod";
import { DeepPartial } from "typeorm";
import { Stores } from "../entities";
import { storeCreateSchema, storesSchema } from "../schemas/stores.schemas";

export type TStore = Stores
export type TStoresCreate = z.infer<typeof storeCreateSchema>
export type TStoreResponse = z.infer<typeof storesSchema>
export type TStoresPartial = DeepPartial<Stores>