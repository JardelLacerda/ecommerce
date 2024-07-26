import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import AppError from "../errors";
import { userRepo } from "../data-source";
import { TUserPermissions } from "../interfaces/users.interfaces";

const existsById = 
    (repo: Repository<any>) => 
    async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
        let id = req.params.id || resp.locals.credencials.id
        
        const exist = await repo.findOneBy({id})

        if(!exist){
            throw new AppError("Id not found", 404)
        }

        resp.locals.found = exist

        return next()
}

const isStoreOwner = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {
    let foundStore = resp.locals.found
    let userId = resp.locals.credencials.id
    let permission = resp.locals.credencials.permission

    if (foundStore.user.id == userId || permission == "admin"){
        return next()
    }

    throw new AppError("You don't have a store with this id")

}

const emailAlreadyExist = async (req: Request, resp: Response, next: NextFunction): Promise<void> => {

    const { email } = req.body

    if(!email){
        return next()
    }

    const foundUser = await userRepo.findOneBy({email})

    if(foundUser){
        throw new AppError("Email already exists")
    }

    return next()
}

const permission = (permissionsRouter: Array<TUserPermissions>) => (req: Request, resp: Response, next: NextFunction) => {
    const { permission, id} = resp.locals.credencials

    if(permissionsRouter.includes("owner") && req.params.id === id){
        return next()
    }

    if(permissionsRouter.includes(permission)){
        return next()
    }

    throw new AppError("Not permission for router")
}


export default {
    existsById,
    isStoreOwner,
    emailAlreadyExist,
    permission
}