import { Router } from "express";
import userRouter from "./users.routers";
import sessionRouter from "./session.routers";
import storesRouter from "./stores.router";

const mainRouter = Router()

mainRouter.use("/users", userRouter)
mainRouter.use("/login", sessionRouter)
mainRouter.use("/stores", storesRouter)

export default mainRouter