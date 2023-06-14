import "express-async-errors"
import "reflect-metadata"
import express, {json} from "express"
import handleError from "./middlewares/handle.middleware"
import mainRouter from "./routers"

const app = express()
app.use(json())

app.use("/api/v1", mainRouter)

app.use(handleError)

export default app