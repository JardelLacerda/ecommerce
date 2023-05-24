import { DataSource, Repository } from "typeorm"
import { User } from "../../../entities"
import { AppDataSource } from "../../../data-source"
import { createListForUsersMock } from "../../mock/users/readUsers.mock"
import supertest from "supertest"
import app from "../../../app"
import utils from "../../mock/utils.mock"
import errosMock from "../../mock/erros.mock"

describe("Read users router - GET /users", () => {
    const baseEndpoint: string = "/users"
    let userRepo: Repository<User> 
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((resp) => {
            userRepo = resp.getRepository(User)
            connection = resp
        })
        .catch((err) => console.log(err))

        await createListForUsersMock(userRepo)
    })

    afterAll(async () => {
        await userRepo.remove(await userRepo.find())
        await connection.destroy()
    })


    it("Sucess - Read users - Token admin", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utils.validToken("admin", "id"))

        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body.length).toEqual(10)
        expect(response.body[0]).not.toHaveProperty("password")
    })

    it("Error - Read users - Token not admin", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utils.validToken("user", "id"))

        const { status, error } = errosMock.forbidden

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })

    it("Error - Read Users - Missing bearer token", async () => {
        const response = await supertest(app)
        .get(baseEndpoint)

        const { status, error } = errosMock.missingBearer

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)
    })

    it("Error - Read users - Jwt Malformed", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utils.jwtMalformed)

        const { status, error } = errosMock.jwtMalformed

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })

    it("Error - Read users - Invalid signature", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utils.invalidSignature)

        const { status, error } = errosMock.invalidSignature

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })
})