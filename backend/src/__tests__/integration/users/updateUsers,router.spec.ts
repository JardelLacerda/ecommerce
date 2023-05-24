import { DataSource, Repository } from "typeorm"
import { User } from "../../../entities"
import { AppDataSource } from "../../../data-source"
import createUsersMock from "../../mock/users/createUsers.mock"
import supertest from "supertest"
import app from "../../../app"
import updateUsersMock from "../../mock/users/updateUsers.mock"
import utilsMock from "../../mock/utils.mock"
import errosMock from "../../mock/erros.mock"

describe("Update users router - PATCH /users", () => {
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

    })

    beforeEach(async () => {
        userBase = userRepo.create(createUsersMock.scDefaultUser)
        await userRepo.save(userBase)
    })

    afterEach(async () => {
        await userRepo.remove(await userRepo.find())
    })

    afterAll(async () => {
        await userRepo.remove(await userRepo.find())
        await connection.destroy()
    })

    
    it("Sucess - Update user deafult full body - Token Admin", async () => {

        const response = await supertest(app)
        .patch(`${baseEndpoint}/${userBase.id}`)
        .send(updateUsersMock.scUpatedFullBody)
        .set("Atuhorization", utilsMock.validToken("admin", "identificador"))

        const { name, email } = updateUsersMock.scUpatedFullBody

        expect(response.status).toEqual(200)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            name,
            email,
            permission: "user",
            createdAt: expect.any(String || Date),
            updatedAt: expect.any(String || Date),
            deletedAt: null
        }))
        expect(response.body.updatedAt).not.toEqual(response.body.createdAt)
    })

    it("Sucess - Update user default partial body - Token user", async () => {
        const response = await supertest(app)
        .patch(`${baseEndpoint}/${userBase.id}`)
        .send(updateUsersMock.scUpdatedPartialBody)
        .set("Atuhorization", utilsMock.validToken("user", userBase.id))

        const { name } = updateUsersMock.scUpdatedPartialBody

        expect(response.status).toEqual(200)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            name,
            email: userBase.email,
            permission: "user",
            createdAt: expect.any(String || Date),
            updatedAt: expect.any(String || Date),
            deletedAt: null
        }))
        expect(response.body.updatedAt).not.toEqual(response.body.createdAt)
    })

    it("Error - Update user admin - Token user", async () => {
        const response = await supertest(app)
        .patch(`${baseEndpoint}/${userBase.id}`)
        .send({name: "usuario"})
        .set("Atuhorization", utilsMock.validToken("user", "oasdu"))

        const { status, error } = errosMock.forbidden

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(expect.objectContaining(error))
        
    })

    it("Error - Update user default - Not update permission", async () => {
        const response = await supertest(app)
        .patch(`${baseEndpoint}/${userBase.id}`)
        .send({permission: "admin"})
        .set("Atuhorization", utilsMock.validToken("admin", userBase.id))

        expect(response.status).toEqual(400)
        expect(response.body).toEqual(expect.objectContaining({
            message: "Cannot modify permission key"
        }))
    })

    it("Error - Update user - Email exists", async () => {
        const response = await supertest(app)
        .patch(`${baseEndpoint}/${userBase.id}`)
        .send({email: userBase.email})
        .set("Atuhorization", utilsMock.validToken("admin", userBase.id))

        const { status, error } = errosMock.clonflit.email

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(expect.objectContaining(error))
    })

    it("Error - Update user - User not found", async () => {
        const response = await supertest(app)
        .patch(`${baseEndpoint}/654aasda253`)
        .send({email: userBase.email})
        .set("Atuhorization", utilsMock.validToken("admin", userBase.id))

        const { status, error } = errosMock.notFound.user

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(expect.objectContaining(error))
    })

    it("Error - Update users - Missing bearer token", async () => {
        const response = await supertest(app)
        .get(baseEndpoint)

        const { status, error } = errosMock.missingBearer

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)
    })

    it("Error - Update users - Jwt Malformed", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utilsMock.jwtMalformed)

        const { status, error } = errosMock.jwtMalformed

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })

    it("Error - Update users - Invalid signature", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utilsMock.invalidSignature)

        const { status, error } = errosMock.invalidSignature

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })


})