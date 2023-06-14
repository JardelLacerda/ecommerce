import { Router } from "express"
import { userRepo } from "../data-source"
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schemas"
import validatedMiddleware from "../middlewares/validated.middleware"
import verifyMiddleware from "../middlewares/verify.middleware"
import usersControllers from "../controllers/users.controllers"

const userRouter = Router()

userRouter.post("", 
    validatedMiddleware.body(userCreateSchema), 
    verifyMiddleware.emailAlreadyExist,
    usersControllers.create
)

userRouter.use(validatedMiddleware.token)

userRouter.get("", 
    verifyMiddleware.permission(["admin"]),
    usersControllers.readAllUsers
)

userRouter.get("/profile", 
    verifyMiddleware.existsById(userRepo),
    usersControllers.readProfile
)

userRouter.patch("/:id", 
    verifyMiddleware.permission(["admin", "owner"]),
    validatedMiddleware.body(userUpdateSchema),
    verifyMiddleware.existsById(userRepo),
    verifyMiddleware.emailAlreadyExist,
    usersControllers.update
)

userRouter.delete("/:id", 
    verifyMiddleware.permission(["admin", "owner"]),
    verifyMiddleware.existsById(userRepo),
    usersControllers.destroy
)

export default userRouter