import { userRepo } from "../data-source";
import AppError from "../errors";
import { TUser, TUserCreate, TUserPartial, TUserResponse } from "../interfaces/users.interfaces";
import { allUsersResponseSchema, oneUserResponseSchema } from "../schemas/users.schemas";


const create = async (payload: TUserCreate): Promise<TUserResponse> => {
    
    const newUser = userRepo.create(payload)

    await userRepo.save(newUser)

    const userResponse = oneUserResponseSchema.parse(newUser)

    return userResponse
}

const readProfile =(foundUser:TUser):TUserResponse => {
    const userResponse = oneUserResponseSchema.parse(foundUser)
    
    return userResponse
}

const readAllUsers = async (): Promise<TUserResponse[]> => {

    const allUsers = await userRepo.find({
        withDeleted: true
    })

    const usersResponse = allUsersResponseSchema.parse(allUsers)    

    return usersResponse
} 

const update = async (payload: TUserPartial, foundUser: TUser): Promise<TUserResponse> => {

    if(Object.keys(payload).length === 0){
        throw new AppError("Need to pass at least one correct key")
    }

    const updatedUser = userRepo.create({
        ...foundUser,
        ...payload
    })

    await userRepo.save(updatedUser)

    const userResponse = oneUserResponseSchema.parse(updatedUser)

    return userResponse
} 

const destroy = async (foundUser: TUser): Promise<void> => {

    await userRepo.softRemove(foundUser)
    console.log("passou o console")
    return 
} 

export default {
    create,
    readProfile,
    readAllUsers,
    update,
    destroy
}