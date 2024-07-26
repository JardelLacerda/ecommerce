import { Router } from "express";
import validatedMiddleware from "../middlewares/validated.middleware";
import { storeCreateSchema, storeUpdateSchema } from "../schemas/stores.schemas";
import verifyMiddleware from "../middlewares/verify.middleware";
import storesControllers from "../controllers/stores.controllers";
import { storesRepo } from "../data-source";

const storesRouter = Router()

storesRouter.get("",
    storesControllers.readAllStores
)

storesRouter.get("/:id",
    verifyMiddleware.existsById(storesRepo),
    storesControllers.readOneStore
)

storesRouter.use(validatedMiddleware.token)

storesRouter.post("",
    verifyMiddleware.permission(["merchant", "admin"]),
    validatedMiddleware.body(storeCreateSchema),
    storesControllers.create
)

storesRouter.patch("/:id",
    verifyMiddleware.permission(["admin", "merchant"]),
    verifyMiddleware.existsById(storesRepo),
    verifyMiddleware.isStoreOwner,
    validatedMiddleware.body(storeUpdateSchema),
    storesControllers.update
)

storesRouter.delete("/:id",
    verifyMiddleware.permission(["admin", "merchant"]),
    verifyMiddleware.existsById(storesRepo),
    verifyMiddleware.isStoreOwner,
    storesControllers.destroy
)

export default storesRouter