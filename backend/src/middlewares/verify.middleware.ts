import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import AppError from "../errors";
import { userRepo } from "../data-source";

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

const permission = (permissionsRouter: Array<"user" | "admin" | "merchant" | "owner">) => (req: Request, resp: Response, next: NextFunction) => {
    const { permission, id} = resp.locals.credencials
    console.log(permission)

    if(permissionsRouter.includes(permission)){
        return next()
    }

    if(permissionsRouter.includes("owner") && req.params.id === id){
        return next()
    }

    throw new AppError("Not permission for router")
}


export default {
    existsById,
    emailAlreadyExist,
    permission
}