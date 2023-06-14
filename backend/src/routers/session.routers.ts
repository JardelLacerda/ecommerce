import { Router } from "express";
import validatedMiddleware from "../middlewares/validated.middleware";
import { sessionSchema } from "../schemas/session.schemas";
import sessionControllers from "../controllers/session.controllers";


const sessionRouter = Router()

sessionRouter.post("", 
    validatedMiddleware.body(sessionSchema),
    sessionControllers.create
)

export default sessionRouter