import { Router } from "express";
import userRouter from "./users.routers";
import sessionRouter from "./session.routers";

const mainRouter = Router()

mainRouter.use("/users", userRouter)
mainRouter.use("/login", sessionRouter)

export default mainRouter