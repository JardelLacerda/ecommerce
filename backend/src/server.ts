import "dotenv/config"
import app from "./app"
import { AppDataSource } from "./data-source"

(async () => {
    await AppDataSource.initialize()
    .then(() => console.log("Database Start"))
    .catch((err) => console.log(err))

    const port: number  = Number(process.env.PORT) || 3000

    app.listen(port, () => {
        console.log("Server Start")
    })
})()