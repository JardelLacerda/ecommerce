import { Router } from "express";
import productsControllers from "../controllers/products.controllers";

const productsRouter = Router()

productsRouter.post("", productsControllers.create)
productsRouter.get("", productsControllers.read)
productsRouter.get("/:id", productsControllers.readOnly)
productsRouter.patch("/:id", productsControllers.update)
productsRouter.delete("/:id", productsControllers.destroy)

export default productsRouter