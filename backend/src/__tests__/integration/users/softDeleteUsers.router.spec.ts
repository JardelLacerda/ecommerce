import { DataSource, Repository } from "typeorm"
import { AppDataSource } from "../../../data-source"
import { User } from "../../../entities"
import supertest from "supertest"
import errosMock from "../../mock/erros.mock"
import app from "../../../app"
import utilsMock from "../../mock/utils.mock"
import createUsersMock from "../../mock/users/createUsers.mock"


describe("Create user router - POST /users", () => {
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
        await userRepo.remove(userBase)
    })

    afterAll(async () => {
        await userRepo.remove(userBase)
        await connection.destroy()
    })

    it("Sucess - Delete users - Admin token", async () => {
        const response = await supertest(app)
        .delete(`${baseEndpoint}/${userBase.id}`)
        .set("Atuhorization", utilsMock.validToken("admin", "identificador"))

        expect(response.status).toEqual(204)
        expect(response.body).toEqual(null)

        const userDeleted = await userRepo.findOne({ where: {id: userBase.id}, withDeleted: true})

        expect(userDeleted?.deletedAt).toEqual(expect.any(String))
    })

    it("Sucess - Delete profile - User token", async () => {
        const response = await supertest(app)
        .delete(`${baseEndpoint}/${userBase.id}`)
        .set("Atuhorization", utilsMock.validToken("user", userBase.id))

        expect(response.status).toEqual(204)
        expect(response.body).toEqual(null)

        const userDeleted = await userRepo.findOne({ where: {id: userBase.id}, withDeleted: true})

        expect(userDeleted?.deletedAt).toEqual(expect.any(String))
    })

    it("Error - Delete users - User token", async () => {
        const response = await supertest(app)
        .delete(`${baseEndpoint}/${userBase.id}`)
        .set("Atuhorization", utilsMock.validToken("user", "userBas23"))

        const { status, error } = errosMock.forbidden
        
        expect(response.status).toEqual(status)
        expect(response.body).toEqual(expect.objectContaining(error))

        const userDeleted = await userRepo.findOne({ where: {id: userBase.id}, withDeleted: true})

        expect(userDeleted?.deletedAt).toEqual(expect.any(String))
    })

    it("Error - Delete user - User not found", async () => {
        const response = await supertest(app)
        .delete(`${baseEndpoint}/654aasda253`)
        .send({email: userBase.email})
        .set("Atuhorization", utilsMock.validToken("admin", userBase.id))

        const { status, error } = errosMock.notFound.user

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(expect.objectContaining(error))
    })

    
    it("Error - Delete users - Missing bearer token", async () => {
        const response = await supertest(app)
        .delete(baseEndpoint)

        const { status, error } = errosMock.missingBearer

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)
    })

    it("Error - delete users - Jwt Malformed", async () => {

        const response = await supertest(app)
        .delete(baseEndpoint)
        .set("Atuhorization", utilsMock.jwtMalformed)

        const { status, error } = errosMock.jwtMalformed

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })

    it("Error - delete users - Invalid signature", async () => {

        const response = await supertest(app)
        .delete(baseEndpoint)
        .set("Atuhorization", utilsMock.invalidSignature)

        const { status, error } = errosMock.invalidSignature

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })

})