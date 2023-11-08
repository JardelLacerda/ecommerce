import { DataSource, DeepPartial, Repository } from "typeorm"
import { Address, User } from "../../../entities"
import { AppDataSource, userRepo } from "../../../data-source"
import supertest from "supertest"
import app from "../../../app"
import createAddressMock from "../../mock/address/createAddress.mock"
import createUsersMock from "../../mock/users/createUsers.mock"
import errosMock from "../../mock/erros.mock"
import utilsMock from "../../mock/utils.mock"
import { ZodError } from "zod"


describe("Create adresses Rrouter - /address/:id", () => {

    const baseEndpoint: string = "/address"
    let addressRepo: Repository<Address> 
    let connection: DataSource 
    let userTest: User

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((resp) => {
            addressRepo = resp.getRepository(Address)
            connection = resp
        })
        .catch((err) => console.log(err))

        userTest = userRepo.create(createUsersMock.scDefaultUser)
        await userRepo.save(userTest)
    })

    beforeEach(async () => {
        const removeUsers = await addressRepo.find()
        await addressRepo.remove(removeUsers)
    })

    afterAll(async () => {
        const removeUsers = await addressRepo.find()
        await addressRepo.remove(removeUsers)
        await connection.destroy()
    })

    it("Sucess - Create address full body", async () => {

        const response = await supertest(app)
        .post(`${baseEndpoint}/${userTest.id}`)
        .send(createAddressMock.scDefaultAddress)

        expect(response.status).toEqual(201)
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            ...createAddressMock.scDefaultAddress
        }))
    })

    it("Sucess - Create address - Without number", async () => {

        const response = await supertest(app)
        .post(`${baseEndpoint}/${userTest.id}`)
        .send(createAddressMock.scAddressNotNumber)

        expect(response.status).toEqual(201)
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            ...createAddressMock.scAddressNotNumber
        }))

    })

    it("Error - Create addres - Duplicate Address", async () => {
        const primaryAddress = addressRepo.create({
            ...createAddressMock.scDefaultAddress,
            user: userTest
        })

        await addressRepo.save(primaryAddress)

        const response = await supertest(app)
        .post(`${baseEndpoint}/${userTest.id}`)
        .send(createAddressMock.scDefaultAddress)

        expect(response.status).toEqual(400)
        expect(response.body).toEqual(expect.objectContaining({
            message: "Addres already exists"
        }))

    })

    it("Error - Create Address - Invalid User Id", async () => {
        const response = await supertest(app)
        .post(`${baseEndpoint}/$2365asda24sda`)
        .send(createAddressMock.errInvalidBody)

        expect(response.status).toEqual(404)
        expect(response).toEqual(expect.objectContaining({
            message: "User id not found"
        }))
    })

    it("Error - Create address - Invalid Body 1 - Undefined Values", async () => {

        const response = await supertest(app)
        .post(`${baseEndpoint}/${userTest.id}`)
        .send(createAddressMock.errInvalidBody)

        expect(response.status).toEqual(400)
        expect(response).toEqual(expect.objectContaining({
            message: expect.any(ZodError)
        }))
        
    })

    it("Error - Create address - Invalid Body 2 - ZipCode Invalid", async () => {

        const response = await supertest(app)
        .post(`${baseEndpoint}/${userTest.id}`)
        .send(createAddressMock.errZipCodeInvalid)

        expect(response.status).toEqual(400)
        expect(response).toEqual(expect.objectContaining({
            message: "Non-existing zip Code"
        }))
    })

    it("Error - Create Address - Missing bearer token", async () => {
        const response = await supertest(app)
        .get(baseEndpoint)

        const { status, error } = errosMock.missingBearer

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)
    })

    it("Error - Create Address - Jwt Malformed", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utilsMock.jwtMalformed)

        const { status, error } = errosMock.jwtMalformed

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })

    it("Error - Create Address - Invalid signature", async () => {

        const response = await supertest(app)
        .get(baseEndpoint)
        .set("Atuhorization", utilsMock.invalidSignature)

        const { status, error } = errosMock.invalidSignature

        expect(response.status).toEqual(status)
        expect(response.body).toEqual(error)

    })



})