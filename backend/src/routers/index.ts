import { Router } from "express";
import userRouter from "./users.routers";
import sessionRouter from "./session.routers";
import productsRouter from "./products.routers";

const mainRouter = Router()

mainRouter.use("/users", userRouter)
mainRouter.use("/login", sessionRouter)
mainRouter.use("/products", productsRouter)

export default mainRouter