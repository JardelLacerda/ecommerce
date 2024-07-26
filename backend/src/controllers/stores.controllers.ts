import { Request, response, Response } from "express";
import { TStore, TStoreResponse, TStoresCreate, TStoresPartial } from "../interfaces/stores.interfaces";
import storeServices from "../services/stores.services";

const create = async (req: Request, resp: Response): Promise<Response<TStoreResponse>> => {

    const body: TStoresCreate = req.body

    const newStore: TStoreResponse = await storeServices.create(body)

    return resp.status(201).json()

}

const readOneStore = async (req: Request, resp: Response): Promise<Response<TStoreResponse>> => {
    const foundStore: TStore = resp.locals.found

    const oneStore = storeServices.readOneStore(foundStore)

    return resp.status(200).json(oneStore)
}

const readAllStores = async (req: Request, resp: Response): Promise<Response<TStoreResponse[]>> => {

    const stores = await storeServices.readAllStores()

    return resp.status(200).json(stores)
}

const update = async (req: Request, resp: Response): Promise<Response<TStoreResponse>> => {
    const foundStore: TStore = resp.locals.found
    const body: TStoresPartial = req.body

    const storeUpdate = await storeServices.update(body, foundStore)

    return resp.status(200).json(storeUpdate)
}

const destroy = async (req: Request, resp: Response): Promise<Response<void>> => {
    const foundStore: TStore = resp.locals.found

    await storeServices.destroy(foundStore)

    return resp.status(204).json()
}

export default {
    create,
    readOneStore,
    readAllStores,
    update,
    destroy
}