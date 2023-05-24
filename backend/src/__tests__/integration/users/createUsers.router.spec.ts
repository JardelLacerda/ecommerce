import { DataSource, Repository } from "typeorm"
import { AppDataSource } from "../../../data-source"
import { User } from "../../../entities"
import supertest from "supertest"
import app from "../../../app"
import createUsersMock from "../../mock/users/createUsers.mock"
import errosMock from "../../mock/erros.mock"


describe("Create user router - POST /users", () => {
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
    })

    beforeEach(async () => {
        const removeUsers = (await userRepo.find()).filter((user) => user.permission !== "admin") 
        await userRepo.remove(removeUsers)
    })

    afterAll(async () => {
        const removeUsers = (await userRepo.find()).filter((user) => user.permission !== "admin") 
        await userRepo.remove(removeUsers)
        await connection.destroy()
    })


    it("Sucess - Create user full body - Default user", async () => {
        
        const response = await supertest(app)
        .post(baseEndpoint)
        .send(createUsersMock.scDefaultUser)

        const {name, email, permission} = createUsersMock.scDefaultUser

        expect(response.status).toEqual(201)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            name,
            email,
            permission,
            createdAt: expect.any(String || Date),
            updatedAt: expect.any(String || Date),
            deletedAt: null
        }))
    })

    it("Sucess - Create user full body - Merchant user ", async () => {
        const response = await supertest(app)
        .post(baseEndpoint)
        .send(createUsersMock.scMerchantUser)

        const {name, email, permission} = createUsersMock.scMerchantUser

        expect(response.status).toEqual(201)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            name,
            email,
            permission,
            createdAt: expect.any(String || Date),
            updatedAt: expect.any(String || Date),
            deletedAt: null
        }))
    })

    it("Sucess - Create user - Without permission", async () => {
        const response = await supertest(app)
        .post(baseEndpoint)
        .send(createUsersMock.scDefaultUserWithoutPermission)

        const {name, email} = createUsersMock.scDefaultUserWithoutPermission

        expect(response.status).toEqual(201)
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
    })

    it("Error - Create user - Unique email", async () => {
        await userRepo.save(userRepo.create(createUsersMock.scDefaultUser))

        const response = await supertest(app)
        .post(baseEndpoint)
        .send(createUsersMock.scDefaultUser)

        const { status, error } =  errosMock.clonflit.email

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(expect.objectContaining(error))
    })

    it("Error - Create user - Permission Invalid", async () => {

        const response = await supertest(app)
        .post(baseEndpoint)
        .send(createUsersMock.errUserOtherPermission)

        expect(response.status).toEqual(400)
        expect(response.body).toEqual(expect.objectContaining({
            message: "Permission key value must be: 'user' or 'merchant'"
        }))
    })

    it("Error - Create user - Body invalid required filds", async () => {
        const response = await supertest(app)
        .post(baseEndpoint)
        .send(createUsersMock.errInvalidBodyRequeridfilds)

        expect(response.status).toEqual(400)
        expect(response.body).toEqual(expect.objectContaining({
            message: [
                "name required fild",
                "email required fild", 
                "password required fild"
            ]
        }))
    })

    it("Error - Create user - Body invalid values", async () => {
        const response = await supertest(app)
        .post(baseEndpoint)
        .send(createUsersMock.errInvalidBodyInvalidValues)

        expect(response.status).toEqual(400)
        expect(response.body).toEqual(expect.objectContaining({
            message: [
                "expected string, received number",
                "expected email, received object", 
                "passoword invalid, min 4 caracteres",
                "Permission key value must be: 'user' or 'merchant'"
            ]
        }))

    })

})