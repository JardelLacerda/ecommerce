import { sign } from "jsonwebtoken"
import "dotenv/config"

export default {
    validTokenAdmin: sign({permission: "admin"}, String(process.env.SECRET_KEY), {
            subject: "1",
            expiresIn: process.env.EXPIRES_IN
        }),
    validTokenUser: sign({permission: "user"}, String(process.env.SECRET_KEY), {
            subject: "2",
            expiresIn: process.env.EXPIRES_IN
        }),
    invalidSignature: sign({ permission: "admin" }, 'invalid_signature'),
    jwtMalformed: '12345',
}