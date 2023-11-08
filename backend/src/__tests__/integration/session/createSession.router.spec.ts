import { DataSource, Repository } from "typeorm"
import { AppDataSource } from "../../../data-source"
import { User } from "../../../entities"
import createUsersMock from "../../mock/users/createUsers.mock"
import supertest from "supertest"
import app from "../../../app"



describe("Create session router - POST /login", () => {

    const baseEndpoint: string = "/login"
    let userRepo: Repository<User> 
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((resp) => {
            userRepo = resp.getRepository(User)
            connection = resp
        })
        .catch((err) => console.log(err))

        const newUser = userRepo.create(createUsersMock.scDefaultUser)
        await userRepo.save(newUser)

        const userInactive = userRepo.create(createUsersMock.inactiveUser)
        await userRepo.save(userInactive)
        await userRepo.softRemove(userInactive)
    })

    afterAll(async () => {
        const removeUsers = await userRepo.find()
        await userRepo.remove(removeUsers)
        await connection.destroy()
    })



    it("Sucess - Create session", async () => {

        const response = await supertest(app)
        .post(baseEndpoint)
        .send({
            email: createUsersMock.scDefaultUser.email,
            password: createUsersMock.scDefaultUser.password
        })

        expect(response.status).toEqual(200)
        expect(response.body).toEqual(expect.objectContaining({
            token: expect.any(String)
        }))

    })

    it("Error - Create session - Invalid credential 1 - User inactive", async () => {

        const response = await supertest(app)
        .post(baseEndpoint)
        .send({
            email: createUsersMock.inactiveUser.email,
            password: createUsersMock.inactiveUser.password
        })

        expect(response.status).toEqual(401)
        expect(response.body).toEqual(expect.objectContaining({
            message: "Invalid credentials"
        }))
    })

    it("Error - Create session - Invalid credential 2 - Wrong email", async () => {

        const response = await supertest(app)
        .post(baseEndpoint)
        .send({
            email: "testando@mail.com.br",
            password: createUsersMock.scDefaultUser.password
        })

        expect(response.status).toEqual(401)
        expect(response.body).toEqual(expect.objectContaining({
            message: "Invalid credentials"
        }))
    })

    it("Error - Create session - Invalid credential 3 - Wrong password", async () => {

        const response = await supertest(app)
        .post(baseEndpoint)
        .send({
            email: createUsersMock.scDefaultUser.email,
            password: "senhainexistente"
        })

        expect(response.status).toEqual(401)
        expect(response.body).toEqual(expect.objectContaining({
            message: "Invalid credentials"
        }))
    })

})