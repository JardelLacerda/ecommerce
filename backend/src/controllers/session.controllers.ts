import { Request, Response } from "express";
import { IToken, TSessionCreate } from "../interfaces/session.interfaces";
import sessionServices from "../services/session.services";

const create = async (req: Request, resp: Response): Promise<Response<IToken>> => {

    const body: TSessionCreate = req.body

    const token:string = await sessionServices.create(body) 

    return resp.status(200).json({token})
}

export default {
    create
}