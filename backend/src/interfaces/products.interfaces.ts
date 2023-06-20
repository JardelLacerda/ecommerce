import { z } from "zod";
import { Product } from "../entities";
import { productCreateSchema } from "../schemas/products.schemas";
import { DeepPartial } from "typeorm";

export type TProduct = Product
export type TProductCreate = z.infer<typeof productCreateSchema>
export type TProductUpdate = DeepPartial<TProduct>