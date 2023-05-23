import { Repository } from "typeorm";
import { User } from "../../../entities";


export const createListForUsersMock = async (userRepo: Repository<User>) => {

    const users: User[] = Array.from(Array(10)).map((_, index: number): User => {
        return userRepo.create({
            name: `user${index}`,
            email: `email${index}@mail.com`,
            password: "1234",
            permission: index % 2 === 0 ? "user" : "merchant" 
        })
    })

    await userRepo.save(users)
}