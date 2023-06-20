import { NextFunction, Request, Response } from "express"
import { TProductCreate } from "../interfaces/products.interfaces"
import productsServices from "../services/products.services"


const create = async (req: Request, resp: Response, next: NextFunction): Promise<Response> => {

    const body: TProductCreate = req.body

    const newProduct = await productsServices.create(body) 

    return resp.status(200).json(newProduct)
} 

const read = async (req: Request, resp: Response, next: NextFunction): Promise<Response> => {

    return resp.status(200).json()
} 

const readOnly = async (req: Request, resp: Response, next: NextFunction): Promise<Response> => {

    return resp.status(200).json()
} 

const update = async (req: Request, resp: Response, next: NextFunction): Promise<Response> => {

    return resp.status(200).json()
} 

const destroy = async (req: Request, resp: Response, next: NextFunction): Promise<Response> => {

    return resp.status(200).json()
} 

export default {
    create,
    read,
    readOnly,
    update,
    destroy
}