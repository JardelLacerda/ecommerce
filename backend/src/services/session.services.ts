import { sign } from "jsonwebtoken"
import { userRepo } from "../data-source"
import { TUser } from "../interfaces/users.interfaces"
import { compare } from "bcryptjs"
import AppError from "../errors"
import { TSessionCreate } from "../interfaces/session.interfaces"

const create = async (payload: TSessionCreate): Promise<string> => {
    const { email, password } = payload

    const user: TUser | null = await userRepo.findOneBy({ email: email })

    if (!user) throw new AppError('Invalid credentials', 401)
  
    const samePassword: boolean = await compare(password, user.password)

    if (!samePassword) throw new AppError('Invalid credentials', 401)
  
    const id: string = user.id.toString()
    const permission: string = user.permission

    const { SECRET_KEY: secretKey, EXPIRES_IN: expiresIn } = process.env
  
    const token: string = sign({ permission }, secretKey!, { subject: id, expiresIn })
  
    return token
}

export default {
    create
}