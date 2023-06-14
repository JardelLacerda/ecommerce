import { Request, Response } from "express";
import {TUser, TUserCreate, TUserPartial, TUserResponse } from "../interfaces/users.interfaces";
import usersServices from "../services/users.services";

const create = async (req: Request, resp: Response): Promise<Response<TUserResponse>> => {
    const body: TUserCreate = req.body 
    
    const newUser: TUserResponse = await usersServices.create(body)

    return resp.status(201).json(newUser)
}

const readProfile = async (req: Request, resp: Response): Promise<Response<TUserResponse>> => {
    const foundUser: TUser = resp.locals.found

    const userProfile = usersServices.readProfile(foundUser)

    return resp.status(200).json(userProfile)
}

const readAllUsers = async (req: Request, resp: Response): Promise<Response<TUserResponse>> => {

    const users = await usersServices.readAllUsers()

    return resp.status(200).json(users)
} 

const update = async (req: Request, resp: Response): Promise<Response<TUserResponse>> => {
    const foundUser: TUser = resp.locals.found
    const body: TUserPartial = req.body

    const userUpdate = await usersServices.update(body, foundUser)

    return resp.status(200).json(userUpdate)
} 

const destroy = async (req: Request, resp: Response): Promise<Response<void>> => {
    const foundUser: TUser = resp.locals.found

    await usersServices.destroy(foundUser)
    console.log("oie")
    return resp.status(204).json()
} 



export default {
    create,
    readProfile,
    readAllUsers,
    update,
    destroy
}