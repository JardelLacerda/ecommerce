import AppError from "../errors";
import { storesRepo } from "../data-source";
import { TStore, TStoreResponse, TStoresCreate, TStoresPartial } from "../interfaces/stores.interfaces";
import { storesSchema } from "../schemas/stores.schemas";
import { allStoresSchema } from "../schemas/stores.schemas";


const create = async (payload: TStoresCreate): Promise<TStoreResponse> => {
    
    const newStore = storesRepo.create(payload)

    await storesRepo.save(newStore)

    const storeResponse = storesSchema.parse(newStore)

    return storeResponse
}

const readOneStore = (foundStore: TStore): TStoreResponse => {
    const storeResponse = storesSchema.parse(foundStore)

    return storeResponse
}

const readAllStores = async (): Promise<TStoreResponse[]> => {

    const allStores = await storesRepo.find()

    const sotresResponse = allStoresSchema.parse(allStores)

    return sotresResponse
}

const update = async (payload: TStoresPartial, foundStore: TStore): Promise<TStoreResponse> => {

    if(Object.keys(payload).length === 0){
        throw new AppError("Need to pass at least one correct key")
    }

    const updateStore = storesRepo.create({
        ...foundStore,
        ...payload
    })
    
    await storesRepo.save(updateStore)

    const storeResponse = storesSchema.parse(updateStore)

    return storeResponse

}

const destroy = async (foundStore: TStore): Promise<void> => {

    await storesRepo.softRemove(foundStore)

    return 
}


export default {
    create,
    readAllStores,
    readOneStore,
    update,
    destroy
}