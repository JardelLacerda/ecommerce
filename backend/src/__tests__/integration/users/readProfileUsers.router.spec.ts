import { DataSource, Repository } from "typeorm"
import { User } from "../../../entities"
import { AppDataSource } from "../../../data-source"
import supertest from "supertest"
import utilsMock from "../../mock/utils.mock"
import errosMock from "../../mock/erros.mock"
import app from "../../../app"
import createUsersMock from "../../mock/users/createUsers.mock"

describe("Read progile router - GET /users/profile", () => {
    const baseEndpoint: string = "/users"
    let userRepo: Repository<User> 
    let connection: DataSource 
    let userBase: User

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((resp) => {
            userRepo = resp.getRepository(User)
            connection = resp
        })
        .catch((err) => console.log(err))

        userBase = userRepo.create(createUsersMock.scDefaultUser)
        await userRepo.save(userBase)
    })

    afterAll(async () => {
        const removeUsers = (await userRepo.find()).filter((user) => user.permission !== "admin") 
        await userRepo.remove(removeUsers)
        await connection.destroy()
    })

    it("Sucess - Profile user", async () => {
        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utilsMock.validToken("user", userBase.id ))
        
        

    })

    it("Error - Profile users - Missing bearer token", async () => {
        const response = await supertest(app)
        .get(baseEndpoint)

        const { status, error } = errosMock.missingBearer

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)
    })

    it("Error - Profile users - Jwt Malformed", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utilsMock.jwtMalformed)

        const { status, error } = errosMock.jwtMalformed

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })

    it("Error - Profile users - Invalid signature", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utilsMock.invalidSignature)

        const { status, error } = errosMock.invalidSignature

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })
})