import { sign } from "jsonwebtoken"
import "dotenv/config"

export default {
    validToken: (permission: "admin" | "merchant" | "user", userId: string) => {
        return sign({permission}, String(process.env.SECRET_KEY), {
            subject: userId,
            expiresIn: process.env.EXPIRES_IN
        })
    },
    invalidSignature: sign({ permission: "admin" }, 'invalid_signature'),
    jwtMalformed: '12345',
}