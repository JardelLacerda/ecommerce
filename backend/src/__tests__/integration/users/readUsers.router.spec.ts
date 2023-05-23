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
        .set("Atuhorization", utils.validTokenAdmin)

        expect(response.status).toEqual(200)
        expect(Array.isArray(response.body)).toEqual(true)
        expect(response.body.length).toEqual(10)
        expect(response.body[0]).not.toHaveProperty("password")
    })

    it("Error - Read users - Token not admin", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utils.validTokenUser)

        expect(response.status).toEqual(errosMock.forbidden.status)
        expect(response.body).toEqual(errosMock.forbidden.error)

    })

    it("Error - Read Users - Missing bearer token", async () => {
        const response = await supertest(app)
        .get(baseEndpoint)

        expect(response.status).toEqual(errosMock.missingBearer.status)
        expect(response.body).toEqual(errosMock.missingBearer.error)
    })

    it("Error - Read users - Jwt Malformed", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utils.jwtMalformed)

        expect(response.status).toEqual(errosMock.jwtMalformed.status)
        expect(response.body).toEqual(errosMock.jwtMalformed.error)

    })

    it("Error - Read users - Invalid signature", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utils.invalidSignature)

        expect(response.status).toEqual(errosMock.invalidSignature.status)
        expect(response.body).toEqual(errosMock.invalidSignature.error)

    })
})