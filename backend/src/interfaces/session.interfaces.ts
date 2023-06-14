import { z } from "zod";
import { sessionSchema } from "../schemas/session.schemas";


export type TSessionCreate = z.infer<typeof sessionSchema> 
export interface IToken{
    token: string
}